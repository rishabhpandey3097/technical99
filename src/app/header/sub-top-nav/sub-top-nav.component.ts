import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { IAppState } from '@app/store/reducers/app.state';
import { selectCategories } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-sub-top-nav',
  standalone: true,
  imports: [CommonModule, MenubarModule],
  templateUrl: './sub-top-nav.component.html',
  styleUrl: './sub-top-nav.component.scss',
})
export class SubTopNavComponent extends BaseComponent implements OnInit {
  public subMenuItems: MenuItem[] | undefined;
  public categories$: Observable<Array<any>>;

  constructor(private store: Store<IAppState>){
    super()

    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if(res?.length) {
        this.subMenuItems = res?.map(c => {
          return {
            label: c?.name,
            items: c?.languages?.map(l => ({label: l?.name}))
          }
        })
      }
    })
  }

  public override ngOnDestroy(): void {
      super.ngOnDestroy();
  }
}
