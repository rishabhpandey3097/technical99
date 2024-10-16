import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { generalActions } from '../actions';
import { catchError, EMPTY, exhaustMap, map, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Injectable()
export class GeneralEffects {
 private actions$ = inject(Actions);
 private homeService = inject(HomeService)

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
}