import { Injectable } from '@angular/core';
import { HomeService } from '@app/services/home.service';
import { TutorialService } from '@app/services/tutorial.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface ILanguageInitialState {
    inProcess: boolean;
    moduleTabContent: any;
}

const DEFAULT_STATE: ILanguageInitialState = {
    inProcess: false,
    moduleTabContent: null,
};

@Injectable()
export class LanguageComponentStore extends ComponentStore<ILanguageInitialState> {
    // selectors
    public readonly inProcess$: Observable<boolean> = this.select(
        (state) => state.inProcess
    );

    public readonly moduleTabContent$: Observable<any> = this.select(state => state.moduleTabContent)

    constructor(private homeService: TutorialService) {
        super(DEFAULT_STATE);
    }

    // Effects
    readonly getTabContent = this.effect(
        (data: Observable<{ lang: string, module: string }>) => {
            return data.pipe(
                switchMap((req: { lang: string, module: string }) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.homeService.getLanguageTopics(req.lang, req.module).pipe(
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
