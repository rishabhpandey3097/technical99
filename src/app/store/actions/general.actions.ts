import { createAction, props } from '@ngrx/store';

export const userLoggedInAction = createAction('[App Is User Logged In]', props<{
    isLoggedIn: boolean
}>());

export const getCategories = createAction('[Home] Get Categories');

export const getCategoriesComplete = createAction('[Home] Get Categories Complete', props<{
    categories: Array<any>
}>())

export const getModules = createAction('[Home] Get Modules');

export const getModulesComplete = createAction('[Home] Get Modules Complete', props<{
    modules: Array<any>
}>())

export const getInterviewQuestions = createAction('[Home] Get Interview Questions');

export const getInterviewQuestionsComplete = createAction('[Home] Get Interview Questions Complete', props<{
    interviewQuestions: Array<any>
}>())


export const getModuleMenu = createAction('[Home] Get Module Menu');

export const getModuleMenuComplete = createAction('[Home] Get Module Menu Complete', props<{
    moduleMenu: Array<any>
}>())

export const getTechnologies = createAction('[Home] Get Technologies');

export const getTechnologiesComplete = createAction('[Home] Get Technologies Complete', props<{
    technologies: Array<any>
}>())

