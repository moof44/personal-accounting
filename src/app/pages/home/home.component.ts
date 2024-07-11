import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { Store } from '@ngrx/store';
import {
  selectIncomesInDateRange,
  selectTotalAmountInDateRange,
} from '../income/store/income.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AccountSummaryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {

    this._store
      .select(selectTotalAmountInDateRange, {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
      })
      .subscribe((x) => {
        console.log('income total ammount:', x);
      });
  }
}
