import { createAction, props } from '@ngrx/store';

export const userLoggedInAction = createAction('[App Is User Logged In]', props<{
    isLoggedIn: boolean
}>());

export const getCategories = createAction('[Home] Get Categories');

export const getCategoriesComplete = createAction('[Home] Get Categories Complete', props<{
    categories: Array<any>
}>())

export const getCategoriesByLanguage = createAction('[Home] Get Categories By Language', props<{ lang: string }>());

export const getCategoriesByLanguageComplete = createAction('[Home] Get Categories By Language Complete', props<{
    subCategories: Array<any>
}>())

export const getModules = createAction('[Home] Get Modules');

export const getModulesComplete = createAction('[Home] Get Modules Complete', props<{
    modules: Array<any>
}>())

export const getInterviewQuestions = createAction('[Home] Get Interview Questions', props<{ moduleId: number }>());

export const getInterviewQuestionsComplete = createAction('[Home] Get Interview Questions Complete', props<{
    interviewQuestions: Array<any>
}>())


export const getModuleMenu = createAction('[Home] Get Module Menu');

export const getModuleMenuComplete = createAction('[Home] Get Module Menu Complete', props<{
    moduleMenu: Array<any>
}>())

export const getTechnologies = createAction('[Home] Get Technologies', props<{ moduleId: number }>());

export const getTechnologiesComplete = createAction('[Home] Get Technologies Complete', props<{
    technologies: Array<any>
}>())

export const isHomePage = createAction('[App] Is Home Page', props<{ isHomePage: boolean }>());

export const setSelectedLanguage = createAction('[App] Set Selected Language', props<{ language: string }>());

export const setCurrentPage = createAction('[Sidebar] Set Current Page Number', props<{ currentPage: number }>());

export const setChangePageNumber = createAction('[Sidebar] Set New Page Number', props<{ pageNumber: number }>());

export const togglePreSignupModalState = createAction('[App] Open/Close State Of Pre Signup Modal', props<{ open: boolean }>());

export const toggleSignupModalState = createAction('[App] Open/Close State Of Signup Modal', props<{ open: boolean }>());

export const toggleSigninModalState = createAction('[App] Open/Close State Of Signin Modal', props<{ open: boolean }>());

export const preSignupAction = createAction('[App] Pre Signup Of User', props<{ email: string }>());

export const preSignupSecretCodeAction = createAction('[App] Set Pre Signup Secret Code', props<{ secret: string }>());

export const signupAction = createAction('[App] Signup User', props<{ payload: any }>());

export const signupActionComplete = createAction('[App] Signup User Complete', props<{ success: boolean }>());

export const signinAction = createAction('[App] Signin User', props<{ payload: any }>());

export const updateMetaTagsAction = createAction('[App] Update Page Meta Tags', props<{
    tags: any
}>())
