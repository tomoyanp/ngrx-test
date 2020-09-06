import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './hoge.reducer';

const allState = createFeatureSelector<State>('hoge');
export const loadState = createSelector(allState, state => state.load);
export const pollingState = createSelector(allState, state => state.polling);
