import { Action, createReducer, on } from '@ngrx/store';
import { generalActions } from '../actions';

export interface IRootState {
  isLoggedIn: boolean;
  categories: Array<any>;
  modules: Array<any>;
  interviewQuestioins: Array<any>;
  moduleMenu: Array<any>;
  technologies: Array<any>;
}

export const initialState: IRootState = {
  isLoggedIn: false,
  categories: null,
  modules: null,
  interviewQuestioins: null,
  moduleMenu: null,
  technologies: null
};

export function userSettingReducer(state: IRootState, action: Action) {
  return _userSettingReducer(state, action);
}

const _userSettingReducer = createReducer(
  initialState,
  on(generalActions.userLoggedInAction, (state, { isLoggedIn }) => {
    return {
      ...state,
      isLoggedIn: isLoggedIn,
    };
  }),
  on(generalActions.getCategoriesComplete, (state, { categories }) => {
    return {
      ...state,
      categories,
    };
  }),
  on(generalActions.getModulesComplete, (state, { modules }) => {
    return {
      ...state,
      modules,
    };
  }),
  on(generalActions.getInterviewQuestionsComplete, (state, { interviewQuestions }) => {
    return {
      ...state,
      interviewQuestions,
    };
  }),
  on(generalActions.getModuleMenuComplete, (state, { moduleMenu }) => {
    return {
      ...state,
      moduleMenu,
    };
  }),
  on(generalActions.getTechnologiesComplete, (state, { technologies }) => {
    return {
      ...state,
      technologies,
    };
  }),
);
