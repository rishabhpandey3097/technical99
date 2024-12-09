import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { generalActions } from '../actions';
import { catchError, concatMap, distinctUntilChanged, EMPTY, exhaustMap, filter, map, mergeMap, Observable, switchMap, takeUntil } from 'rxjs';
import { of } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { BaseComponent } from '@app/base-component/base.component';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../reducers/app.state';
import { selectCategoriesByRoute } from '../selectors';
import { isEqual } from 'lodash-es';
import { GlobalService } from '@app/services/global.service';

@Injectable()
export class GeneralEffects extends BaseComponent {
  private actions$ = inject(Actions);
  private homeService = inject(HomeService);
  private globalService = inject(GlobalService);
  private categoriesByRoute$: Observable<any>;

  constructor(private store: Store<IAppState>) {
    super()
    this.categoriesByRoute$ = this.store.pipe(
      select(selectCategoriesByRoute),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.getCategories),
      switchMap((p) => {
        return this.homeService
          .getCategories()
          .pipe(
            map((res) => {
              if (res && +res?.status === 200) {
                return generalActions.getCategoriesComplete({ categories: res?.data });
              } else {
                return generalActions.getCategoriesComplete({ categories: null });
              }
            }),
            catchError((error) => {
              return of(generalActions.getCategoriesComplete({ categories: null }));
            })
          );
      })
    )
  );

  getCategoriesByLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.getCategoriesByLanguage),
      concatMap((p) => {
        return this.homeService
          .getCategoriesByLanguage(p?.lang)
          .pipe(
            map((res) => {
              if (res && +res?.status === 200 && res?.data?.length) {
                let data = [{ name: 'Home', route: 'home', id: 0 }, ...res?.data]
                return generalActions.getCategoriesByLanguageComplete({ subCategories: data });
              } else {
                return generalActions.getCategoriesByLanguageComplete({ subCategories: this.getValueFromObservable(this.categoriesByRoute$) });
              }
            }),
            catchError((error) => {
              return of(generalActions.getCategoriesByLanguageComplete({ subCategories: this.getValueFromObservable(this.categoriesByRoute$) }));
            })
          );
      })
    )
  );

  getModules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.getModules),
      switchMap((p) => {
        return this.homeService
          .getModules()
          .pipe(
            map((res) => {
              if (res && +res?.status === 200) {
                return generalActions.getModulesComplete({ modules: res?.data });
              } else {
                return generalActions.getModulesComplete({ modules: null });
              }
            }),
            catchError((error) => {
              return of(generalActions.getModulesComplete({ modules: null }));
            })
          );
      })
    )
  );

  getInterviewQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.getInterviewQuestions),
      switchMap((p) => {
        return this.homeService
          .getInterviewQuestions(p.moduleId)
          .pipe(
            map((res) => {
              if (res && +res?.status === 200) {
                return generalActions.getInterviewQuestionsComplete({ interviewQuestions: res?.data });
              } else {
                return generalActions.getInterviewQuestionsComplete({ interviewQuestions: null });
              }
            }),
            catchError((error) => {
              return of(generalActions.getInterviewQuestionsComplete({ interviewQuestions: null }));
            })
          );
      })
    )
  );

  preSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.preSignupAction),
      switchMap((p) => {
        return this.globalService
          .preSignup(p)
          .pipe(
            mergeMap((res) => {
              if (res && +res?.status === 200) {
                return [generalActions.preSignupSecretCodeAction({ secret: res?.data?.secretKey })];
              } else {
                return [generalActions.preSignupSecretCodeAction({ secret: null })];
              }
            }),
            catchError((error) => {
              return of(generalActions.preSignupSecretCodeAction({ secret: null }));
            })
          );
      })
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.signupAction),
      switchMap((p) => {
        return this.globalService
          .signup(p?.payload)
          .pipe(
            mergeMap((res) => {
              if (res && +res?.status === 200) {
                return [
                  generalActions.signupActionComplete({ success: true }),
                  generalActions.preSignupSecretCodeAction({ secret: null })
                ];
              } else {
                return [generalActions.signupActionComplete({ success: false })];
              }
            }),
            catchError((error) => {
              return of(generalActions.signupActionComplete({ success: false }));
            })
          );
      })
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generalActions.signinAction),
      switchMap((p) => {
        return this.globalService
          .login(p?.payload)
          .pipe(
            mergeMap((res) => {
              if (res && +res?.status === 200) {
                return [
                  generalActions.userLoggedInAction({ isLoggedIn: true })
                ];
              } else {
                return [generalActions.userLoggedInAction({ isLoggedIn: false })];
              }
            }),
            catchError((error) => {
              return of(generalActions.userLoggedInAction({ isLoggedIn: false }));
            })
          );
      })
    )
  );
}