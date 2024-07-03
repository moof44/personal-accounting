import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExpenseStore } from './store/expense.store';
import { AddUpdateExpenseComponent } from './components/add-update-expense/add-update-expense.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectAll } from './store/expense.reducer';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { ExpenseActions } from './store/expense.actions';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    ExpenseStore,
    AddUpdateExpenseComponent,
    MatCardModule,
    SharedTableComponent,
    //BrowserAnimationsModule,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseComponent {
  // inject
  private _store = inject(Store);

  // OUTPUT
  income$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(ExpenseActions.loadExpenses());
    this._init();
  }

  private _init(){
    this.table = [
      {label: 'Date', column: 'date'},
      {label: 'Description', column: 'description'},
      {label: 'Amount', column: 'amount'},
      {label: 'Remarks', column: 'remarks'},
    ]
  }

}
