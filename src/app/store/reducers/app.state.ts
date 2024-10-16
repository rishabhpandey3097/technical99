import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import * as rootReducer from './root.reducer';

export interface IAppState {
  root: rootReducer.IRootState;
}

export const reducers: ActionReducerMap<IAppState> = {
  root: rootReducer.userSettingReducer,
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any): any {
    if (action.type === '[Logout] User') {
      state = undefined;
    }
    return reducer(state, action);
  };
}
