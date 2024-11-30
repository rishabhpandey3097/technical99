import { Injectable } from '@angular/core';
import { HomeService } from '@app/services/home.service';
import { TutorialService } from '@app/services/tutorial.service';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface ILanguageInitialState {
    inProcess: boolean;
    moduleTabContent: any;
    faqs: any;
    languageBasedBlogs: any;
    faqContent: any;
}

const DEFAULT_STATE: ILanguageInitialState = {
    inProcess: false,
    moduleTabContent: null,
    faqs: null,
    languageBasedBlogs: null,
    faqContent: null
};

@Injectable()
export class LanguageComponentStore extends ComponentStore<ILanguageInitialState> {
    // selectors
    public readonly inProcess$: Observable<boolean> = this.select(
        (state) => state.inProcess
    );
    public readonly moduleTabContent$: Observable<any> = this.select(state => state.moduleTabContent)
    public readonly faqs$: Observable<any> = this.select(state => state.faqs);
    public readonly faqContent$: Observable<any> = this.select(state => state.faqContent);
    public readonly languageBasedBlogs$: Observable<any> = this.select(state => state.languageBasedBlogs);

    constructor(private service: TutorialService, private homeService: HomeService) {
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
                    return this.service.getLanguageTopics(req.lang, req.module).pipe(
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

    readonly getFaqs = this.effect(
        (data: Observable<{ lang: string }>) => {
            return data.pipe(
                switchMap((req: { lang: string }) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.homeService.getFaqs(req.lang).pipe(
                        tapResponse(
                            (res: any) => {
                                if (res && +res.status === 200) {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            faqs: res?.data,
                                            faqContent: JSON.parse(res?.data?.faqs)
                                        };
                                    });
                                } else {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            faqs: null,
                                            faqContent: null
                                        };
                                    });
                                }
                            },
                            (error: any) => {
                                this.setState((_state) => {
                                    return {
                                        ..._state,
                                        inProcess: false,
                                        faqs: null,
                                        faqContent: null
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

    readonly getLanguageBasedBlogs = this.effect(
        (data: Observable<{ lang: string, size: number }>) => {
            return data.pipe(
                switchMap((req: { lang: string, size: number }) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.homeService.getLanguageBasedBlogs(req?.lang, req?.size).pipe(
                        tapResponse(
                            (res: any) => {
                                if (res && +res.status === 200) {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            languageBasedBlogs: res?.data,
                                        };
                                    });
                                } else {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            languageBasedBlogs: null,
                                        };
                                    });
                                }
                            },
                            (error: any) => {
                                this.setState((_state) => {
                                    return {
                                        ..._state,
                                        inProcess: false,
                                        languageBasedBlogs: null,
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
