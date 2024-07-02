// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { incomesFeatureKey, reducer } from './income.reducer';

@NgModule({
  imports: [StoreModule.forFeature(incomesFeatureKey, reducer)],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class IncomeStore {}
