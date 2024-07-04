import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Savings } from '../model/savings.model';
import { Update } from '@ngrx/entity';

export const SavingActions = createActionGroup({
  source: 'Saving',
  events: {
    'Load Savings': emptyProps(),
    'Load Savings Success': props<{ savings: Savings[] }>(),
    'Add Saving': props<{ saving: Savings }>(),
    'Add Saving Success': props<{ saving: Savings }>(),
    'Upsert Saving': props<{ saving: Savings }>(),
    'Add Savings': props<{ savings: Savings[] }>(),
    'Upsert Savings': props<{ savings: Savings[] }>(),
    'Update Saving': props<{ saving: Update<Savings> }>(),
    'Update Savings': props<{ savings: Update<Savings>[] }>(),
    'Delete Saving': props<{ id: string }>(),
    'Delete Savings': props<{ ids: string[] }>(),
    'Clear Saving': emptyProps(),
  }
});
