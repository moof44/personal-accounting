// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { purchaseFeatureKey, reducer } from './purchase.reducer';
import { PurchaseEffects } from './purchase.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(purchaseFeatureKey, reducer),
    EffectsModule.forFeature([PurchaseEffects])
  ],
  exports: [StoreModule] // Make the StoreModule available for import
})
export class PurchaseStore {}
