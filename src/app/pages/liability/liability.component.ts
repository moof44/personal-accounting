import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AddUpdateLiabilityComponent } from './components/add-update-liability/add-update-liability.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectAll } from './store/liability.reducer';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { LiabilityActions } from './store/liability.actions';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';
import { LiabilityStore } from './store/liability.store';

@Component({
  selector: 'app-liability',
  standalone: true,
  imports: [
    CommonModule,
    AddUpdateLiabilityComponent,
    MatCardModule,
    SharedTableComponent,
    LiabilityStore,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './liability.component.html',
  styleUrl: './liability.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiabilityComponent {
  // inject
  private _store = inject(Store);

  // OUTPUT
  liability$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(LiabilityActions.loadLiabilities());
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
