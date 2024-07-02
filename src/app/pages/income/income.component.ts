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
  ],
  providers: [provideNativeDateAdapter(),],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent{
  // inject
  private _income: IncomeService = inject(IncomeService);

  // OUTPUT
  income$ = this._income.income$;

  // lifecycle
  ngOnInit(){
    this._income.init();
  }

  formGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    incomeSource: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    remarks: new FormControl(''),
  });

  save() {
    if (this.formGroup.valid) {
      console.log('form', this.formGroup.value);
      this._income.addIncome(this.formGroup.value as any);
    } else {
      // handle invalid form
    }
  }

  reset() {
    this.formGroup.reset();
  }

}
