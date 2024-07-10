import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CapitalStore } from './store/capital.store';
import { AddUpdateCapitalComponent } from './components/add-update-capital/add-update-capital.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectAll } from './store/capital.reducer';
import { SharedTableModel } from '../../shared/model/shared-table.model';
import { CapitalActions } from './store/capital.actions';
import { SharedTableComponent } from '../../shared/shared-table/shared-table.component';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [
    CommonModule,
    //CapitalStore,
    AddUpdateCapitalComponent,
    MatCardModule,
    SharedTableComponent,
    //BrowserAnimationsModule,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapitalComponent {
  // inject
  private _store = inject(Store);

  // OUTPUT
  capital$ = this._store.select(selectAll);
  table:SharedTableModel[] = [];

  // lifecycle
  ngOnInit(){
    this._store.dispatch(CapitalActions.loadCapitals());
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
