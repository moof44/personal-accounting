import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PurchaseStore } from './store/purchase.store';
import { AddUpdatePurchaseComponent } from './components/add-update-purchase/add-update-purchase.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectAll } from './store/purchase.reducer';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { PurchaseActions } from './store/purchase.actions';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    CommonModule,
    PurchaseStore,
    AddUpdatePurchaseComponent,
    MatCardModule,
    SharedTableComponent,
    //BrowserAnimationsModule,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseComponent {
  // inject
  private _store = inject(Store);

  // OUTPUT
  purchase$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(PurchaseActions.loadPurchases());
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
