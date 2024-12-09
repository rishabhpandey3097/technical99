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
  currentPageNumber: number;
  changePageNumber: number;
  openPreSignupModal: boolean;
  openSignupModal: boolean;
  openSigninModal: boolean;
  preSignupEmail: string;
  preSignupSecretCode: string;
  signupSuccess: boolean;
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
  selectedLanguage: null,
  currentPageNumber: 0,
  changePageNumber: 0,
  openPreSignupModal: false,
  openSignupModal: false,
  openSigninModal: false,
  preSignupEmail: null,
  preSignupSecretCode: null,
  signupSuccess: false
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
  on(generalActions.setCurrentPage, (state, { currentPage }) => {
    return {
      ...state,
      currentPageNumber: currentPage
    };
  }),
  on(generalActions.setChangePageNumber, (state, { pageNumber }) => {
    return {
      ...state,
      changePageNumber: pageNumber
    };
  }),
  on(generalActions.togglePreSignupModalState, (state, { open }) => {
    return {
      ...state,
      openPreSignupModal: open
    };
  }),
  on(generalActions.toggleSignupModalState, (state, { open }) => {
    return {
      ...state,
      openSignupModal: open
    };
  }),
  on(generalActions.toggleSigninModalState, (state, { open }) => {
    return {
      ...state,
      openSigninModal: open
    };
  }),
  on(generalActions.preSignupAction, (state, { email }) => {
    return {
      ...state,
      preSignupEmail: email
    };
  }),
  on(generalActions.preSignupSecretCodeAction, (state, { secret }) => {
    return {
      ...state,
      preSignupSecretCode: secret
    };
  }),
  on(generalActions.signupActionComplete, (state, { success }) => {
    return {
      ...state,
      signupSuccess: success
    };
  }),
);
