import { createFeature, createReducer, on } from '@ngrx/store';
import { ExpenseActions } from './expense.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Expense } from '../model/expense.model';

export const expenseFeatureKey = 'expense';

export interface State extends EntityState<Expense> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>();


export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ExpenseActions.addExpenseSuccess,
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2449383247.
    (state, action) => adapter.addOne(action.expense, state)
  ),
  on(ExpenseActions.upsertExpense,
    (state, action) => adapter.upsertOne(action.expense, state)
  ),
  on(ExpenseActions.addExpenses,
    (state, action) => adapter.addMany(action.expenses, state)
  ),
  on(ExpenseActions.upsertExpenses,
    (state, action) => adapter.upsertMany(action.expenses, state)
  ),
  on(ExpenseActions.updateExpense,
    (state, action) => adapter.updateOne(action.expense, state)
  ),
  on(ExpenseActions.updateExpenses,
    (state, action) => adapter.updateMany(action.expenses, state)
  ),
  on(ExpenseActions.deleteExpense,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ExpenseActions.deleteExpenses,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ExpenseActions.loadExpensesSuccess,
    (state, action) => adapter.setAll(action.expenses, state)
  ),
  on(ExpenseActions.clearExpenses,
    state => adapter.removeAll(state)
  ),
);

export const expenseFeature = createFeature({
  name: expenseFeatureKey,
  reducer,
  extraSelectors: ({ selectExpenseState }) => ({
    ...adapter.getSelectors(selectExpenseState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = expenseFeature;
