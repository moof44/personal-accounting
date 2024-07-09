import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Purchase } from '../model/purchase.model';
import { Update } from '@ngrx/entity';

export const PurchaseActions = createActionGroup({
  source: 'Purchase',
  events: {
    'Load Purchases': emptyProps(),
    'Load Purchases Success': props<{ purchases: Purchase[] }>(),
    'Add Purchase': props<{ purchase: Purchase }>(),
    'Add Purchase Success': props<{ purchase: Purchase }>(),
    'Upsert Purchase': props<{ purchase: Purchase }>(),
    'Add Purchases': props<{ purchases: Purchase[] }>(),
    'Upsert Purchases': props<{ purchases: Purchase[] }>(),
    'Update Purchase': props<{ purchase: Update<Purchase> }>(),
    'Update Purchases': props<{ purchases: Update<Purchase>[] }>(),
    'Delete Purchase': props<{ id: string }>(),
    'Delete Purchases': props<{ ids: string[] }>(),
    'Clear Purchase': emptyProps(),
  }
});
