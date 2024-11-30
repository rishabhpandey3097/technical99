import { Component } from '@angular/core';
import { LanguageSubTopNavComponent } from '../../header/language-sub-top-nav/language-sub-top-nav.component';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/reducers/app.state';
import { generalActions } from '@app/store/actions';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { BaseComponent } from '@app/base-component/base.component';
import { selectCategoriesByRoute } from '@app/store/selectors';
import { isEqual } from 'lodash-es';
import { LanguageComponentStore } from './language.component.store';
import { TemplateGeneratorComponent } from '@app/template-generator/template-generator.component';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [LanguageSubTopNavComponent, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, AccordionModule, TabViewModule, CommonModule, CardModule, SwitchTechnologyComponent, TemplateGeneratorComponent],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss',
  providers: [LanguageComponentStore]
})
export class LanguageComponent extends BaseComponent {
  public categories$: Observable<any>;
  public tabContent$ = this.componentStore.moduleTabContent$;
  public faqs$ = this.componentStore.faqs$;
  public faqContent$ = this.componentStore.faqContent$;
  public languageBasedBlogs$ = this.componentStore.languageBasedBlogs$;
  public currentLang: string;
  public selectedModule: any;
  public countMap = {
    'tutorial': 'tutCount',
    'mcq': 'mcqCount',
    'interview': 'iqCount',
    'coding': 'csCount',
    'blog': 'blogCount'
  }
  constructor(private store: Store<IAppState>, private route: ActivatedRoute, private componentStore: LanguageComponentStore) {
    super()
    this.categories$ = this.store.pipe(
      select(selectCategoriesByRoute),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.route.params.subscribe(res => {
      if (res?.['lang']) {
        this.currentLang = res?.['lang']
        this.componentStore.getTabContent({ lang: this.currentLang, module: 'tutorial' });
        this.componentStore.getFaqs({ lang: this.currentLang });
        this.componentStore.getLanguageBasedBlogs({ lang: this.currentLang, size: 4 });
        this.store.dispatch(generalActions.getCategoriesByLanguage({ lang: res?.['lang'] }));
      }
    })
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.length) {
        this.selectedModule = this.categories$[1];
      }
    })
  }

  public tabChange(event: any): void {
    let categories = this.getValueFromObservable(this.categories$)?.filter(cat => cat?.id !== 0);
    this.selectedModule = categories.find(item => item?.id === (event?.index + 1));
    this.componentStore.getTabContent({
      lang: this.currentLang,
      module: this.selectedModule?.route
    })
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
