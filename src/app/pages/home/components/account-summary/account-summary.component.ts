import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AccountSummaryService } from '../../../../shared/service/account-summary.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-account-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './account-summary.component.html',
  styleUrl: './account-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSummaryComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['item', 'total'];

  private incomeSubscription: Subscription | undefined;
  private capitalSubscription: Subscription | undefined;
  private expenseSubscription: Subscription | undefined;
  private purchaseSubscription: Subscription | undefined;
  private netIncomeSubscription: Subscription | undefined;

  private _dataSource = new BehaviorSubject<any[]>([]);
  dataSource$ = this._dataSource.asObservable();

  constructor(
    private _accountSummaryService: AccountSummaryService,
    private _cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    // Income
    this.incomeSubscription = this._accountSummaryService.incomeInDateRangeTotal$.subscribe((data) => {
      this.updateDataSource('Total Income', data, 1);
    });

    // Capital
    this.capitalSubscription = this._accountSummaryService.capitalInDateRangeTotal$.subscribe((data) => {
      this.updateDataSource('Total Capital', data, 2);
    });

    // Expense
    this.expenseSubscription = this._accountSummaryService.expenseInDateRangeTotal$.subscribe((data) => {
      this.updateDataSource('Total Expense', data, 3);
    });

    // Purchase
    this.purchaseSubscription = this._accountSummaryService.purchaseInDateRangeTotal$.subscribe((data) => {
      this.updateDataSource('Total Purchase', data, 4);
    });

    // Net Income
    this.netIncomeSubscription = this._accountSummaryService.netIncome$.subscribe((data) => {
      this.updateDataSource('Net Income', data, 5);
    });
  }

  // Helper function to update the dataSource array
  private updateDataSource(item: string, total: number, id: number) {
    const isFind = this._dataSource.getValue().findIndex((item) => item.id === id);
    if (isFind < 0) {
      this._dataSource.next([...this._dataSource.getValue(), { id, item, total }]);
    } else {
      const updatedDataSource = [...this._dataSource.getValue()];
      updatedDataSource[isFind].total = total;
      updatedDataSource[isFind].item = item;
      this._dataSource.next(updatedDataSource);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.incomeSubscription?.unsubscribe();
    this.capitalSubscription?.unsubscribe();
    this.expenseSubscription?.unsubscribe();
    this.purchaseSubscription?.unsubscribe();
    this.netIncomeSubscription?.unsubscribe();
    this._dataSource.complete();
  }
}
