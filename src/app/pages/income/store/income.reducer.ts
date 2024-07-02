import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Income } from '../model/income.model';
import { IncomeActions } from './income.actions';

export const incomesFeatureKey = 'incomes';

export interface State extends EntityState<Income> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Income> = createEntityAdapter<Income>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

console.log('initialState', initialState);

export const reducer = createReducer(
  initialState,
  on(IncomeActions.addIncome,
    (state, action) => adapter.addOne(action.income, state)
  ),
  on(IncomeActions.upsertIncome,
    (state, action) => adapter.upsertOne(action.income, state)
  ),
  on(IncomeActions.addIncomes,
    (state, action) => adapter.addMany(action.incomes, state)
  ),
  on(IncomeActions.upsertIncomes,
    (state, action) => adapter.upsertMany(action.incomes, state)
  ),
  on(IncomeActions.updateIncome,
    (state, action) => adapter.updateOne(action.income, state)
  ),
  on(IncomeActions.updateIncomes,
    (state, action) => adapter.updateMany(action.incomes, state)
  ),
  on(IncomeActions.deleteIncome,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(IncomeActions.deleteIncomes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(IncomeActions.loadIncomes,
    (state, action) => adapter.setAll(action.incomes, state)
  ),
  on(IncomeActions.clearIncomes,
    state => adapter.removeAll(state)
  ),
);

export const incomesFeature = createFeature({
  name: incomesFeatureKey,
  reducer,
  extraSelectors: ({ selectIncomesState }) => ({
    ...adapter.getSelectors(selectIncomesState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = incomesFeature;
