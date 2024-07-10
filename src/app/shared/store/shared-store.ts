// src/app/pages/income/store/income.store.ts
import { NgModule } from '@angular/core';
import { IncomeStore } from '../../pages/income/store/income.store';
import { CapitalStore } from '../../pages/capital/store/capital.store';
import { ExpenseStore } from '../../pages/expense/store/expense.store';
import { LiabilityStore } from '../../pages/liability/store/liability.store';
import { PurchaseStore } from '../../pages/purchase/store/purchase.store';
import { SavingStore } from '../../pages/savings/store/savings.store';



@NgModule({
    imports: [
        CapitalStore,
        ExpenseStore,
        IncomeStore,
        LiabilityStore,
        PurchaseStore,
        SavingStore,
    ],
})
export class SharedStore {}
