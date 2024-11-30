import { Injectable } from '@angular/core';
import { TutorialService } from '@app/services/tutorial.service';
import { ComponentStore } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export interface ITutorialInitialState {
    inProcess: boolean;
    topicTitles: any[];
    topicContent: any;
    languages: any;
}

const DEFAULT_STATE: ITutorialInitialState = {
    inProcess: false,
    topicTitles: null,
    topicContent: null,
    languages: null
};

@Injectable()
export class TutorialComponentStore extends ComponentStore<ITutorialInitialState> {
    // selectors
    public readonly inProcess$: Observable<boolean> = this.select(
        (state) => state.inProcess
    );
    public readonly topicTitles$: Observable<Array<any>> = this.select(state => state.topicTitles);
    public readonly topicContent$: Observable<any> = this.select(state => state.topicContent);
    public readonly languages$: Observable<any> = this.select(state => state.languages);

    constructor(private service: TutorialService) {
        super(DEFAULT_STATE);
    }

    // Effects
    readonly getTopicTitles = this.effect(
        (data: Observable<{ lang: string, subTopic: string }>) => {
            return data.pipe(
                switchMap((req: { lang: string, subTopic: string }) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.service.getSubTopicTitles(req.lang, req.subTopic).pipe(
                        tapResponse(
                            (res: any) => {
                                if (res && +res.status === 200) {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            topicTitles: res?.data,
                                        };
                                    });
                                } else {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            topicTitles: null,
                                        };
                                    });
                                }
                            },
                            (error: any) => {
                                this.setState((_state) => {
                                    return {
                                        ..._state,
                                        inProcess: false,
                                        topicTitles: null,
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

    readonly getTopicContent = this.effect(
        (data: Observable<string>) => {
            return data.pipe(
                switchMap((title: string) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.service.getTopicContent(title).pipe(
                        tapResponse(
                            (res: any) => {
                                if (res && +res.status === 200) {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            topicContent: res?.data,
                                        };
                                    });
                                } else {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            topicContent: null,
                                        };
                                    });
                                }
                            },
                            (error: any) => {
                                this.setState((_state) => {
                                    return {
                                        ..._state,
                                        inProcess: false,
                                        topicContent: null,
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

    readonly getSwitchBoxLanguages = this.effect(
        (data: Observable<{ lang: string, selectedLanguage }>) => {
            return data.pipe(
                switchMap((p: { lang: string, selectedLanguage: string }) => {
                    this.setState((_state) => {
                        return { ..._state, inProcess: true };
                    });
                    return this.service.getSwitchLanguage(p.lang).pipe(
                        tapResponse(
                            (res: any) => {
                                if (res && +res.status === 200) {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            languages: res?.data?.filter(item => item?.name?.toLowerCase() !== p?.selectedLanguage),
                                        };
                                    });
                                } else {
                                    this.setState((_state) => {
                                        return {
                                            ..._state,
                                            inProcess: false,
                                            languages: null,
                                        };
                                    });
                                }
                            },
                            (error: any) => {
                                this.setState((_state) => {
                                    return {
                                        ..._state,
                                        inProcess: false,
                                        languages: null,
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
