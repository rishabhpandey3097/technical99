import { Action, createReducer, on } from '@ngrx/store';
import { generalActions } from '../actions';

export interface IRootState {
  isLoggedIn: boolean;
  categories: Array<any>;
  categoriesByLanguage: Array<any>;
  modules: Array<any>;
  interviewTechnologies: Array<any>;
  moduleMenu: Array<any>;
  technologies: Array<any>;
  isHomePage: boolean;
  selectedLanguage: string;
}

export const initialState: IRootState = {
  isLoggedIn: false,
  categories: null,
  categoriesByLanguage: null,
  modules: null,
  interviewTechnologies: null,
  moduleMenu: null,
  technologies: null,
  isHomePage: false,
  selectedLanguage: null
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
  on(generalActions.getCategoriesByLanguageComplete, (state, { subCategories }) => {
    return {
      ...state,
      categoriesByLanguage: subCategories,
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
  on(generalActions.getInterviewQuestionsComplete, (state, { interviewQuestions }) => {
    return {
      ...state,
      interviewTechnologies: interviewQuestions,
    };
  }),
  on(generalActions.isHomePage, (state, { isHomePage }) => {
    return {
      ...state,
      isHomePage,
    };
  }),
  on(generalActions.setSelectedLanguage, (state, { language }) => {
    return {
      ...state,
      selectedLanguage: language
    };
  }),
);
