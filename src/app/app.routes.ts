import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/home/home.component').then(
                (c) => c.HomeComponent
            ),  
    },
    {
        path: 'income',
        loadComponent: () =>
            import('./pages/income/income.component').then(
                (c) => c.IncomeComponent
            ),
    },
    {
        path: 'expenses',
        loadComponent: () =>
            import('./pages/expense/expense.component').then(
                (c) => c.ExpenseComponent
            ),
    },
    {
        path: 'purchases',
        loadComponent: () =>
            import('./pages/purchase/purchase.component').then(
                (c) => c.PurchaseComponent
            ),
    },
    {
        path: 'capital',
        loadComponent: () =>
            import('./pages/capital/capital.component').then(
                (c) => c.CapitalComponent
            ),
    },
    {
        path: 'savings',
        loadComponent: () =>
            import('./pages/savings/savings.component').then(
                (c) => c.SavingsComponent
            ),
    },
    {
        path: 'liability',
        loadComponent: () =>
            import('./pages/liability/liability.component').then(
                (c) => c.LiabilityComponent
            ),
    },
];
