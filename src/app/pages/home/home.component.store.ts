import { Injectable } from '@angular/core';
import { HomeService } from '@app/services/home.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface IHomeIntialState {
  inProcess: boolean;
  moduleInfo: any;
}

const DEFAULT_STATE: IHomeIntialState = {
  inProcess: false,
  moduleInfo: null,
};

@Injectable()
export class HomeComponentStore extends ComponentStore<IHomeIntialState> {
  // selectors
  public readonly inProcess$: Observable<boolean> = this.select(
    (state) => state.inProcess
  );

  public readonly moduleInfo$: Observable<any> = this.select(state => state.moduleInfo)

  constructor(private homeService: HomeService) {
    super(DEFAULT_STATE);
  }

  readonly getModuleInfo = this.effect(
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
                      moduleInfo: res?.data,
                    };
                  });
                } else {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      moduleInfo: null,
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
