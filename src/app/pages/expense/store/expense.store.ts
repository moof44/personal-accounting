// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { expenseFeatureKey, reducer } from './expense.reducer';
import { ExpenseEffects } from './expense.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(expenseFeatureKey, reducer),
    EffectsModule.forFeature([ExpenseEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class ExpenseStore {}
