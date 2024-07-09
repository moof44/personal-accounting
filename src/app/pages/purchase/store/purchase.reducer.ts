import { createFeature, createReducer, on } from '@ngrx/store';
import { PurchaseActions } from './purchase.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Purchase } from '../model/purchase.model';

export const purchaseFeatureKey = 'purchase';

export interface State extends EntityState<Purchase> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Purchase> = createEntityAdapter<Purchase>();


export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PurchaseActions.addPurchaseSuccess,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2449383247.
    (state, action) => adapter.addOne(action.purchase, state)
  ),
  on(PurchaseActions.upsertPurchase,
    (state, action) => adapter.upsertOne(action.purchase, state)
  ),
  on(PurchaseActions.addPurchases,
    (state, action) => adapter.addMany(action.purchases, state)
  ),
  on(PurchaseActions.upsertPurchases,
    (state, action) => adapter.upsertMany(action.purchases, state)
  ),
  on(PurchaseActions.updatePurchase,
    (state, action) => adapter.updateOne(action.purchase, state)
  ),
  on(PurchaseActions.updatePurchases,
    (state, action) => adapter.updateMany(action.purchases, state)
  ),
  on(PurchaseActions.deletePurchase,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PurchaseActions.deletePurchases,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PurchaseActions.loadPurchasesSuccess,
    (state, action) => adapter.setAll(action.purchases, state)
  ),
  on(PurchaseActions.clearPurchase,
    state => adapter.removeAll(state)
  ),
);

export const purchaseFeature = createFeature({
  name: purchaseFeatureKey,
  reducer,
  extraSelectors: ({ selectPurchaseState }) => ({
    ...adapter.getSelectors(selectPurchaseState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = purchaseFeature;
