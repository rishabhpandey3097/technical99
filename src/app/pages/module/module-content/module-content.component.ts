import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { LanguageComponentStore } from '@app/pages/language/language.component.store';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-module-content',
  templateUrl: './module-content.component.html',
  styleUrl: './module-content.component.scss',
  providers: [LanguageComponentStore]
})
export class ModuleContentComponent extends BaseComponent {
  public selectedLanguage: string;
  public sideBarContent$: Observable<any> = this.languageComponentStore.moduleTabContent$;
  constructor(private route: ActivatedRoute, private languageComponentStore: LanguageComponentStore) {
    super()
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.['lang']) {
        this.selectedLanguage = res?.['lang'];
        this.languageComponentStore.getTabContent({ lang: this.selectedLanguage, module: res?.['moduleName'] });
      }
    })


  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
