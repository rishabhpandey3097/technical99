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
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CommonModule, SwitchTechnologyComponent, TutorialSidebarComponent, BlogsSidebarComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss',
  providers: [TutorialComponentStore, LanguageComponentStore]
})
export class TutorialComponent extends BaseComponent {
  public sideBarContent$: Observable<Array<any>> = this.languageComponentStore.moduleTabContent$;
  public topicTitles$: Observable<Array<any>> = this.tutorialComponentStore.topicTitles$;
  public topicContent$: Observable<any> = this.tutorialComponentStore.topicContent$;
  public selectedLanguage: string;

  constructor(private activatedRoute: ActivatedRoute, private languageComponentStore: LanguageComponentStore, private tutorialComponentStore: TutorialComponentStore) {
    super()
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      if (res) {
        this.selectedLanguage = res?.['lang'];
        this.languageComponentStore.getTabContent({ lang: this.selectedLanguage, module: res?.['moduleName'] })
      }
    })

    this.topicContent$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      console.log("topicContent ==>", res);
    })
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
