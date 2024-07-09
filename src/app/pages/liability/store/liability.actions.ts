import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Liability } from '../model/liability.model';
import { Update } from '@ngrx/entity';

export const LiabilityActions = createActionGroup({
  source: 'Liability',
  events: {
    'Load Liabilities': emptyProps(),
    'Load Liabilities Success': props<{ liabilities: Liability[] }>(),
    'Add Liability': props<{ liability: Liability }>(),
    'Add Liability Success': props<{ liability: Liability }>(),
    'Upsert Liability': props<{ liability: Liability }>(),
    'Add Liabilities': props<{ liabilities: Liability[] }>(),
    'Upsert Liabilities': props<{ liabilities: Liability[] }>(),
    'Update Liability': props<{ liability: Update<Liability> }>(),
    'Update Liabilities': props<{ liabilities: Update<Liability>[] }>(),
    'Delete Liability': props<{ id: string }>(),
    'Delete Liabilities': props<{ ids: string[] }>(),
    'Clear Liabilities': emptyProps(),
  }
});
