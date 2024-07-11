import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { AddUpdateIncomeComponent } from './components/add-update-income/add-update-income.component';
import { IncomeTableComponent } from './components/income-table/income-table.component';
import { IncomeActions } from './store/income.actions';
import { selectAll } from './store/income.reducer';
import { IncomeStore } from './store/income.store';

@Component({
  selector: 'income-page',
  standalone: true,
  imports: [
    //IncomeStore,
    MatCardModule,
    IncomeTableComponent,
    AddUpdateIncomeComponent,
    SharedTableComponent,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent{
  // inject
  private _store = inject(Store);

  // OUTPUT
  income$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(IncomeActions.loadIncomes());
    this._init();
  }

  private _init(){
    this.table = [
      {label: 'Date', column: 'date'},
      {label: 'Income Source', column: 'incomeSource'},
      {label: 'Amount', column: 'amount'},
      {label: 'Remarks', column: 'remarks'},
    ]
  }

}
