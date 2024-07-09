// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { liabilityFeatureKey, reducer } from './liability.reducer';
import { LiabilityEffects } from './liability.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(liabilityFeatureKey, reducer),
    EffectsModule.forFeature([LiabilityEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class LiabilityStore {}
