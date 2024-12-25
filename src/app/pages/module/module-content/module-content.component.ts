import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { LanguageComponentStore } from '@app/pages/language/language.component.store';
import { LayoutComponentStore } from '@app/pages/layout/layout.component.store';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrl: './module-content.component.scss',
  providers: [LanguageComponentStore, LayoutComponentStore]
})
export class ModuleContentComponent extends BaseComponent {
  public selectedLanguage: string;
  private selectedModule: string;
  public sideBarContent$: Observable<any> = this.languageComponentStore.moduleTabContent$;
  public topicTitles$: Observable<Array<any>> = this.layoutComponentStore.topicTitles$;

  constructor(private route: ActivatedRoute, private languageComponentStore: LanguageComponentStore, private layoutComponentStore: LayoutComponentStore, private router: Router, private store: Store<IAppState>) {
    super()
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.['lang']) {
        this.selectedLanguage = res?.['lang'];
        this.selectedModule = res?.['moduleName'];
        this.languageComponentStore.getTabContent({ lang: this.selectedLanguage, module: res?.['moduleName'] });
      }
    })

    this.topicTitles$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.length) {
        const title = res?.[0]?.shortTitle?.toLowerCase()?.replace(' ', '-');
        this.router.navigateByUrl(`/${this.selectedLanguage}/${this.selectedModule}/${title}`);
      }
    })
  }

  public openTopic(topic: any): void {
    if (topic?.topics?.length) {
      this.layoutComponentStore.getTopicTitles({
        lang: this.selectedLanguage,
        subTopic: topic?.topics[0]?.name?.toLowerCase()?.replace(' ', '-')
      });
      this.store.dispatch(generalActions.setCurrentPage({
        currentPage: 0
      }))
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
