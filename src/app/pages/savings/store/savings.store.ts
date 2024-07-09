// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { savingFeatureKey, reducer } from './savings.reducer';
import { SavingEffects } from './savings.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(savingFeatureKey, reducer),
    EffectsModule.forFeature([SavingEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class SavingStore {}
