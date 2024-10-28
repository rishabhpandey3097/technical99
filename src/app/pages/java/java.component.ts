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
import { selectCategories } from '@app/store/selectors';
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-java',
  standalone: true,
  imports: [LanguageSubTopNavComponent, FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, AccordionModule, TabViewModule, CommonModule, CardModule, SwitchTechnologyComponent],
  templateUrl: './java.component.html',
  styleUrl: './java.component.scss'
})
export class JavaComponent extends BaseComponent {
  public categories$: Observable<any>;
  constructor(private store: Store<IAppState>, private route: ActivatedRoute){
    super()

    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.route.params.subscribe(res => {
      if(res?.['lang']) {
        this.store.dispatch(generalActions.getCategoriesByLanguage({lang: res?.['lang']}))
      }
    })
  }

  public tabChange(event: any): void {
    console.log("event ==>", event);
  }

  public override ngOnDestroy(): void {
      super.ngOnDestroy()
  }
}
