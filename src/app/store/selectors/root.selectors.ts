import { createSelector } from '@ngrx/store';
import { IAppState } from '../reducers/app.state';

export const selectState = (state: IAppState) => state;
export const selectRootState = createSelector(selectState, (p) => p.root);

export const selectIsUserLoggedIn = createSelector(
  selectRootState,
  (state) => state.isLoggedIn
);

export const selectCategories = createSelector(
  selectRootState,
  state => state.categories
)

export const selectCategoriesByRoute = createSelector(
  selectRootState,
  state => state.categoriesByLanguage
)

export const selectModules = createSelector(
  selectRootState,
  state => state.modules
)

export const selectInterview = createSelector(
  selectRootState,
  state => state.interviewTechnologies
)

export const selectTechnologies = createSelector(
  selectRootState,
  state => state.modules
)

export const selectIsHomePage = createSelector(
  selectRootState,
  state => state.isHomePage
)

export const selectedLanguage = createSelector(
  selectRootState,
  state => state.selectedLanguage
)

export const selectCurrentPageNumber = createSelector(
  selectRootState,
  state => state.currentPageNumber
)

export const selectChangePageNumber = createSelector(
  selectRootState,
  state => state.changePageNumber
)
export const selectPreSignupModalState = createSelector(
  selectRootState,
  state => state.openPreSignupModal
)
export const selectSignupModalState = createSelector(
  selectRootState,
  state => state.openSignupModal
)
export const selectSigninModalState = createSelector(
  selectRootState,
  state => state.openSigninModal
)
export const selectPreSignupEmail = createSelector(
  selectRootState,
  state => state.preSignupEmail
)
export const selectPreSignupSecretCode = createSelector(
  selectRootState,
  state => state.preSignupSecretCode
)
export const selectSignupSuccess = createSelector(
  selectRootState,
  state => state.signupSuccess
)

