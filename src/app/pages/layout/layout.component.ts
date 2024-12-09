import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { LayoutComponentStore } from './layout.component.store';
import { LanguageComponentStore } from '../language/language.component.store';
import { Observable, map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/reducers/app.state';
import { generalActions } from '@app/store/actions';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [LayoutComponentStore, LanguageComponentStore]
})
export class LayoutComponent extends BaseComponent {
  public sideBarContent$: Observable<Array<any>> = this.languageComponentStore.moduleTabContent$;
  public topicTitles$: Observable<Array<any>> = this.layoutComponentStore.topicTitles$;
  public topicContent$: Observable<any> = this.layoutComponentStore.topicContent$;
  public languages$: Observable<any> = this.layoutComponentStore.languages$;
  public blogsByLanguage$: Observable<any> = this.languageComponentStore.languageBasedBlogs$
  public selectedLanguage: string;
  private moduleName: string;

  constructor(private activatedRoute: ActivatedRoute, private languageComponentStore: LanguageComponentStore, private layoutComponentStore: LayoutComponentStore, private store: Store<IAppState>, private router: Router) {
    super()
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    this.activatedRoute.params.subscribe(res => {
      this.moduleName = res?.['moduleName'];
      if (res?.['lang']?.trim()?.length) {
        this.selectedLanguage = res?.['lang'];
        this.languageComponentStore.getTabContent({ lang: this.selectedLanguage, module: res?.['moduleName'] });
        this.layoutComponentStore.getSwitchBoxLanguages({ lang: this.selectedLanguage, selectedLanguage: this.selectedLanguage });
        this.languageComponentStore.getLanguageBasedBlogs({ lang: this.selectedLanguage, size: 100 });
        this.store.dispatch(generalActions.getCategoriesByLanguage({ lang: res?.['lang'] }));
        this.store.dispatch(generalActions.setSelectedLanguage({ language: this.selectedLanguage }));
      }
    })

    this.topicContent$.pipe(takeUntil(this.destroy$)).pipe(map(res => {
      return {
        ...res,
        contents: JSON.parse(res?.contents),
        videoId: JSON.parse(res?.videoId),
        metadata: JSON.parse(res?.metadata),
        relatedLinks: JSON.parse(res?.relatedLinks)
      }
    }))
  }

  public selectedSubTopic(event): void {
    this.layoutComponentStore.getTopicTitles({
      lang: this.selectedLanguage,
      subTopic: event?.subTopic?.toLowerCase()?.replace(' ', '-')
    })
  }

  public selectedTitle(event): void {
    this.router.navigateByUrl(`/layout/${this.moduleName}/${this.selectedLanguage}/${event}`);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
