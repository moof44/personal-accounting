import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'income',
        pathMatch: 'full',
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
];
