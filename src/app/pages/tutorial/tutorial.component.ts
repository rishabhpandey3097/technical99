import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlogsSidebarComponent } from '@app/@shared/blogs-sidebar/blogs-sidebar.component';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { TutorialSidebarComponent } from '@app/@shared/tutorial-sidebar/tutorial-sidebar.component';
import { BaseComponent } from '@app/base-component/base.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TutorialComponentStore } from './tutorial.component.store';
import { LanguageComponentStore } from '../language/language.component.store';
import { Observable, filter, map, takeUntil } from 'rxjs';
import { TemplateGeneratorComponent } from '@app/template-generator/template-generator.component';
import { Store } from '@ngrx/store';
import { IAppState } from '@app/store/reducers/app.state';
import { generalActions } from '@app/store/actions';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CommonModule, SwitchTechnologyComponent, TutorialSidebarComponent, BlogsSidebarComponent, TemplateGeneratorComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss',
  providers: [TutorialComponentStore, LanguageComponentStore]
})
export class TutorialComponent extends BaseComponent {
  public sideBarContent$: Observable<Array<any>> = this.languageComponentStore.moduleTabContent$;
  public topicTitles$: Observable<Array<any>> = this.tutorialComponentStore.topicTitles$;
  public topicContent$: Observable<any> = this.tutorialComponentStore.topicContent$;
  public languages$: Observable<any> = this.tutorialComponentStore.languages$;
  public blogsByLanguage$: Observable<any> = this.languageComponentStore.languageBasedBlogs$
  public selectedLanguage: string;

  constructor(private activatedRoute: ActivatedRoute, private languageComponentStore: LanguageComponentStore, private tutorialComponentStore: TutorialComponentStore, private store: Store<IAppState>) {
    super()
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      if (res?.['lang']?.trim()?.length) {
        this.selectedLanguage = res?.['lang'];
        this.languageComponentStore.getTabContent({ lang: this.selectedLanguage, module: res?.['moduleName'] });
        this.tutorialComponentStore.getSwitchBoxLanguages({ lang: this.selectedLanguage, selectedLanguage: this.selectedLanguage });
        this.languageComponentStore.getLanguageBasedBlogs({ lang: this.selectedLanguage, size: 100 });
        this.store.dispatch(generalActions.getCategoriesByLanguage({ lang: res?.['lang'] }));
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
    this.tutorialComponentStore.getTopicTitles({
      lang: this.selectedLanguage,
      subTopic: event?.subTopic?.toLowerCase()?.replace(' ', '-')
    })
  }

  public selectedTitle(event): void {
    this.tutorialComponentStore.getTopicContent(event);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
