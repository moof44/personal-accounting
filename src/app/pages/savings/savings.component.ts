import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AddUpdateSavingsComponent } from './components/add-update-savings/add-update-savings.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectAll } from './store/savings.reducer';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { SavingActions } from './store/savings.actions';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { SavingStore } from './store/savings.store';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    CommonModule,
    AddUpdateSavingsComponent,
    MatCardModule,
    SharedTableComponent,
    SavingStore,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavingsComponent {
  // inject
  private _store = inject(Store);

  // OUTPUT
  savings$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(SavingActions.loadSavings());
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
