import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { IAppState } from '@app/store/reducers/app.state';
import { selectCategories, selectCategoriesByRoute, selectIsHomePage } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-top-nav',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './sub-top-nav.component.html',
  styleUrl: './sub-top-nav.component.scss',
})
export class SubTopNavComponent extends BaseComponent implements OnInit {
  public subMenuItems: MenuItem[] | undefined;
  public subCategoriesItems: MenuItem[] | undefined;
  public categories$: Observable<Array<any>>;
  public categoriesByRoute$: Observable<Array<any>>;
  public isHomePage$: Observable<boolean>;

  constructor(private store: Store<IAppState>, private router: Router) {
    super()
    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.categoriesByRoute$ = this.store.pipe(
      select(selectCategoriesByRoute),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.isHomePage$ = this.store.pipe(
      select(selectIsHomePage),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.length) {
        this.subMenuItems = res?.map(c => {
          return {
            label: c?.name,
            items: c?.languages?.map(lang => {
              return {
                label: lang?.name,
                command: () => {
                  let route = lang?.name?.toLowerCase()?.replace(' ', '-')
                  return this.router.navigateByUrl(`/language/${route}`)
                }
              }
            })
          }
        })
      }
    })
    this.categoriesByRoute$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.length) {
        this.subCategoriesItems = res?.map(c => {
          return {
            label: c?.name,
            command: () => {
              let route = c?.name?.toLowerCase()?.replace(' ', '-')
              return this.router.navigateByUrl(`/module/${route}`)
            }
          }
        })
      } else {
        this.subCategoriesItems = [];
      }
    })
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
