import { Injectable } from '@angular/core';
import { HomeService } from '@app/services/home.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface IHomeIntialState {
  inProcess: boolean;
  moduleTabContent: any;
}

const DEFAULT_STATE: IHomeIntialState = {
  inProcess: false,
  moduleTabContent: null,
};

@Injectable()
export class HomeComponentStore extends ComponentStore<IHomeIntialState> {
  // selectors
  public readonly inProcess$: Observable<boolean> = this.select(
    (state) => state.inProcess
  );

  public readonly moduleTabContent$: Observable<any> = this.select(state => state.moduleTabContent)

  constructor(private homeService: HomeService) {
    super(DEFAULT_STATE);
  }

  // Effects
  readonly getTabContent = this.effect(
    (data: Observable<{id: number}>) => {
      return data.pipe(
        switchMap((req: {id: number}) => {
          this.setState((_state) => {
            return { ..._state, inProcess: true };
          });
          return this.homeService.getModuleInfo(req?.id).pipe(
            tapResponse(
              (res: any) => {
                if (res && +res.status === 200) {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      moduleTabContent: res?.data,
                    };
                  });
                } else {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      moduleTabContent: null,
                    };
                  });
                }
              },
              (error: any) => {
                this.setState((_state) => {
                  return {
                    ..._state,
                    inProcess: false,
                    moduleInfo: null,
                  };
                });
              }
            ),
            catchError((err) => EMPTY)
          );
        })
      );
    }
  );
}
