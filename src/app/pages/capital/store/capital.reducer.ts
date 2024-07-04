import { createFeature, createReducer, on } from '@ngrx/store';
import { CapitalActions } from './capital.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Capital } from '../model/capital.model';

export const capitalFeatureKey = 'capital';

export interface State extends EntityState<Capital> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Capital> = createEntityAdapter<Capital>();


export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CapitalActions.addCapitalSuccess,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2449383247.
    (state, action) => adapter.addOne(action.capital, state)
  ),
  on(CapitalActions.upsertCapital,
    (state, action) => adapter.upsertOne(action.capital, state)
  ),
  on(CapitalActions.addCapitals,
    (state, action) => adapter.addMany(action.capitals, state)
  ),
  on(CapitalActions.upsertCapitals,
    (state, action) => adapter.upsertMany(action.capitals, state)
  ),
  on(CapitalActions.updateCapital,
    (state, action) => adapter.updateOne(action.capital, state)
  ),
  on(CapitalActions.updateCapitals,
    (state, action) => adapter.updateMany(action.capitals, state)
  ),
  on(CapitalActions.deleteCapital,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CapitalActions.deleteCapitals,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CapitalActions.loadCapitalsSuccess,
    (state, action) => adapter.setAll(action.capitals, state)
  ),
  on(CapitalActions.clearCapital,
    state => adapter.removeAll(state)
  ),
);

export const capitalFeature = createFeature({
  name: capitalFeatureKey,
  reducer,
  extraSelectors: ({ selectCapitalState }) => ({
    ...adapter.getSelectors(selectCapitalState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = capitalFeature;
