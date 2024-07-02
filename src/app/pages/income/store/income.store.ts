// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { incomesFeatureKey, reducer } from './income.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IncomeEffects } from './income.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(incomesFeatureKey, reducer),
    EffectsModule.forFeature([IncomeEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class IncomeStore {}
