import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { LayoutComponentStore } from '@app/pages/layout/layout.component.store';
import { IAppState } from '@app/store/reducers/app.state';
import { selectCurrentPageNumber } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { Observable, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { generalActions } from '@app/store/actions';
import { Meta, Title } from '@angular/platform-browser';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Component({
  selector: 'app-module-main-content',
  templateUrl: './module-main-content.component.html',
  styleUrl: './module-main-content.component.scss'
})
export class ModuleMainContentComponent extends BaseComponent {
  public topicContent$: Observable<any> = this.layoutComponentStore.topicContent$;

  public currentPageNumber$: Observable<number>;

  private cookieService = inject(SsrCookieService);
  constructor(private route: ActivatedRoute, private layoutComponentStore: LayoutComponentStore, private store: Store<IAppState>) {
    super()

    this.currentPageNumber$ = this.store.pipe(
      select(selectCurrentPageNumber),
      takeUntil(this.destroy$),
      distinctUntilChanged(isEqual)
    )
  }

  public ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.['topic']) {
        this.layoutComponentStore.getTopicContent(res?.['topic'])
      }
    })

    this.topicContent$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.store.dispatch(generalActions.updateMetaTagsAction({ tags: res?.metadata }));
      }
    })
  }

  public changePage(counter): void {
    this.currentPageNumber$.pipe(take(1)).subscribe(res => {
      this.store.dispatch(generalActions.setChangePageNumber({
        pageNumber: res + counter
      }))
    })
  }

  public likeArticle(): void {
    this.store.dispatch(generalActions.togglePreSignupModalState({ open: true }))
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
