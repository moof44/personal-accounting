import { createFeature, createReducer, on } from '@ngrx/store';
import { SavingActions } from './savings.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Savings } from '../model/savings.model';

export const savingFeatureKey = 'saving';

export interface State extends EntityState<Savings> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Savings> = createEntityAdapter<Savings>();


export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(SavingActions.addSavingSuccess,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2449383247.
    (state, action) => adapter.addOne(action.saving, state)
  ),
  on(SavingActions.upsertSaving,
    (state, action) => adapter.upsertOne(action.saving, state)
  ),
  on(SavingActions.addSavings,
    (state, action) => adapter.addMany(action.savings, state)
  ),
  on(SavingActions.upsertSavings,
    (state, action) => adapter.upsertMany(action.savings, state)
  ),
  on(SavingActions.updateSaving,
    (state, action) => adapter.updateOne(action.saving, state)
  ),
  on(SavingActions.updateSavings,
    (state, action) => adapter.updateMany(action.savings, state)
  ),
  on(SavingActions.deleteSaving,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(SavingActions.deleteSavings,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(SavingActions.loadSavingsSuccess,
    (state, action) => adapter.setAll(action.savings, state)
  ),
  on(SavingActions.clearSaving,
    state => adapter.removeAll(state)
  ),
);

export const savingFeature = createFeature({
  name: savingFeatureKey,
  reducer,
  extraSelectors: ({ selectSavingState }) => ({
    ...adapter.getSelectors(selectSavingState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = savingFeature;
