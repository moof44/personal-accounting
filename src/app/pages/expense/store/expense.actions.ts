import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Expense } from '../model/expense.model';
import { Update } from '@ngrx/entity';

export const ExpenseActions = createActionGroup({
  source: 'Expense',
  events: {
    'Load Expenses': emptyProps(),
    'Load Expenses Success': props<{ expenses: Expense[] }>(),
    'Add Expense': props<{ expense: Expense }>(),
    'Add Expense Success': props<{ expense: Expense }>(),
    'Upsert Expense': props<{ expense: Expense }>(),
    'Add Expenses': props<{ expenses: Expense[] }>(),
    'Upsert Expenses': props<{ expenses: Expense[] }>(),
    'Update Expense': props<{ expense: Update<Expense> }>(),
    'Update Expenses': props<{ expenses: Update<Expense>[] }>(),
    'Delete Expense': props<{ id: string }>(),
    'Delete Expenses': props<{ ids: string[] }>(),
    'Clear Expenses': emptyProps(),
  }
});
