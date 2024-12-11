import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { selectCategories, selectedLanguage } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from "lodash-es";
import { Router, RouterModule } from '@angular/router';
import { IAppState } from '@app/store/reducers/app.state';
import { generalActions } from '@app/store/actions';
@Component({
  selector: 'app-switch-technology',
  standalone: true,
  imports: [CommonModule, CardModule, RouterModule],
  templateUrl: './switch-technology.component.html',
  styleUrl: './switch-technology.component.scss'
})
export class SwitchTechnologyComponent extends BaseComponent {
  @Input() containerType: boolean = true;
  @Input() switchBoxlanguages: any
  public selectedIndex: number = 0;
  public menus;
  public currentMenu;
  public categories$: Observable<any>;
  public selectedLanguage$: Observable<string>;

  constructor(private store: Store<IAppState>, private router: Router) {
    super()
    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.selectedLanguage$ = this.store.pipe(
      select(selectedLanguage),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.menus = res?.map(item => {
          return {
            name: item?.name,
            menuItems: item?.languages
          }
        })
        this.currentMenu = this.menus?.[0]
      }
    })
  }

  public changeMenuItems(index) {
    this.selectedIndex = index;
    this.currentMenu = this.menus[index]
  }

  public goToSelectedRoute(route: string): void {
    if (!route) return;
    this.store.dispatch(generalActions.setSelectedLanguage({ language: route }));
    setTimeout(() => {
      this.router.navigateByUrl(`/language/${route}`)
    }, 100);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
