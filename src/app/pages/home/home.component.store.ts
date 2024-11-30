import { Injectable } from '@angular/core';
import { HomeService } from '@app/services/home.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface IHomeIntialState {
  inProcess: boolean;
  moduleTabContent: any;
  reviews: any;
  trendingBlogs: any;
}

const DEFAULT_STATE: IHomeIntialState = {
  inProcess: false,
  moduleTabContent: null,
  reviews: null,
  trendingBlogs: null
};

@Injectable()
export class HomeComponentStore extends ComponentStore<IHomeIntialState> {
  // selectors
  public readonly inProcess$: Observable<boolean> = this.select(
    (state) => state.inProcess
  );

  public readonly moduleTabContent$: Observable<any> = this.select(state => state.moduleTabContent)

  public readonly reviews$: Observable<any> = this.select(state => state.reviews);
  public readonly trendingBlogs$: Observable<any> = this.select(state => state.trendingBlogs);

  constructor(private homeService: HomeService) {
    super(DEFAULT_STATE);
  }

  // Effects
  readonly getTabContent = this.effect(
    (data: Observable<{ id: number }>) => {
      return data.pipe(
        switchMap((req: { id: number }) => {
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

  readonly getTrendingBlogs = this.effect(
    (data: Observable<void>) => {
      return data.pipe(
        switchMap(() => {
          this.setState((_state) => {
            return { ..._state, inProcess: true };
          });
          return this.homeService.getBlogs().pipe(
            tapResponse(
              (res: any) => {
                if (res && +res.status === 200) {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      trendingBlogs: res?.data,
                    };
                  });
                } else {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      trendingBlogs: null,
                    };
                  });
                }
              },
              (error: any) => {
                this.setState((_state) => {
                  return {
                    ..._state,
                    inProcess: false,
                    trendingBlogs: null,
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

  readonly getReviews = this.effect(
    (data: Observable<void>) => {
      return data.pipe(
        switchMap(() => {
          this.setState((_state) => {
            return { ..._state, inProcess: true };
          });
          return this.homeService.getReviews().pipe(
            tapResponse(
              (res: any) => {
                if (res && +res.status === 200) {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      reviews: res?.data,
                    };
                  });
                } else {
                  this.setState((_state) => {
                    return {
                      ..._state,
                      inProcess: false,
                      reviews: null,
                    };
                  });
                }
              },
              (error: any) => {
                this.setState((_state) => {
                  return {
                    ..._state,
                    inProcess: false,
                    reviews: null,
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
