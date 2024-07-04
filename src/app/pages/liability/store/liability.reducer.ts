import { createFeature, createReducer, on } from '@ngrx/store';
import { LiabilityActions } from './liability.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Liability } from '../model/liability.model';

export const liabilityFeatureKey = 'liability';

export interface State extends EntityState<Liability> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Liability> = createEntityAdapter<Liability>();


export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(LiabilityActions.addLiabilitySuccess,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2449383247.
    (state, action) => adapter.addOne(action.liability, state)
  ),
  on(LiabilityActions.upsertLiability,
    (state, action) => adapter.upsertOne(action.liability, state)
  ),
  on(LiabilityActions.addLiabilities,
    (state, action) => adapter.addMany(action.liabilities, state)
  ),
  on(LiabilityActions.upsertLiabilities,
    (state, action) => adapter.upsertMany(action.liabilities, state)
  ),
  on(LiabilityActions.updateLiability,
    (state, action) => adapter.updateOne(action.liability, state)
  ),
  on(LiabilityActions.updateLiabilities,
    (state, action) => adapter.updateMany(action.liabilities, state)
  ),
  on(LiabilityActions.deleteLiability,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(LiabilityActions.deleteLiabilities,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(LiabilityActions.loadLiabilitiesSuccess,
    (state, action) => adapter.setAll(action.liabilities, state)
  ),
  on(LiabilityActions.clearLiabilities,
    state => adapter.removeAll(state)
  ),
);

export const liabilityFeature = createFeature({
  name: liabilityFeatureKey,
  reducer,
  extraSelectors: ({ selectLiabilityState }) => ({
    ...adapter.getSelectors(selectLiabilityState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = liabilityFeature;
