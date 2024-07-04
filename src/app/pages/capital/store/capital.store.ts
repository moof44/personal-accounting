// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { capitalFeatureKey, reducer } from './capital.reducer';
import { CapitalEffects } from './capital.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(capitalFeatureKey, reducer),
    EffectsModule.forFeature([CapitalEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class CapitalStore {}
