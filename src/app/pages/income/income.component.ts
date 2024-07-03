import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { IncomeService } from './income.service';
import {MatCardModule} from '@angular/material/card';
import { IncomeTableComponent } from './components/income-table/income-table.component';
import { AddUpdateIncomeComponent } from './components/add-update-income/add-update-income.component';
import { Store } from '@ngrx/store';
import { IncomeActions } from './store/income.actions';
import { selectAll } from './store/income.reducer';

@Component({
  selector: 'income-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCardModule,
    IncomeTableComponent,
    AddUpdateIncomeComponent,
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent{
  // inject
  private _income: IncomeService = inject(IncomeService);
  private _store = inject(Store);

  // OUTPUT
  income$ = this._store.select(selectAll);

  // lifecycle
  ngOnInit(){
    this._store.dispatch(IncomeActions.loadIncomes());
  }

}
