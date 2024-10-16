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

export const selectModules = createSelector(
  selectRootState,
  state => state.modules
)