import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Income } from '../model/income.model';

export const IncomeActions = createActionGroup({
  source: 'Income/API',
  events: {
    'Load Incomes': emptyProps(),
    'Load Incomes Success': props<{ incomes: Income[] }>(),
    'Add Income': props<{ income: Income }>(),
    'Add Income Success': props<{ income: Income }>(),
    'Upsert Income': props<{ income: Income }>(),
    'Add Incomes': props<{ incomes: Income[] }>(),
    'Upsert Incomes': props<{ incomes: Income[] }>(),
    'Update Income': props<{ income: Update<Income> }>(),
    'Update Incomes': props<{ incomes: Update<Income>[] }>(),
    'Delete Income': props<{ id: string }>(),
    'Delete Incomes': props<{ ids: string[] }>(),
    'Clear Incomes': emptyProps(),
  }
});
