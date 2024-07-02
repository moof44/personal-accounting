import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import * as fromIncome from '../pages/income/store/income.reducer';


export interface State {
  [fromIncome.incomesFeatureKey]: fromIncome.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromIncome.incomesFeatureKey]: fromIncome.reducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
