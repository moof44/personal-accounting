import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MatTableModule } from '@angular/material/table';
import { AccountSummaryService } from '../../../../shared/service/account-summary.service';

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
export class AccountSummaryComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  netIncome: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalPurchase: number = 0;
  totalCapital: number = 0;

  constructor(
    private _accountSummaryService: AccountSummaryService,
  ) {
    // const calculateFinancials = httpsCallable(this.functions, 'calculateFinancials');
    // calculateFinancials()
    //   .then(total=>{
    //     console.log('calculateFinancials', total);
    //   })
  }

  ngOnInit(): void {
    this._accountSummaryService.netIncome$.subscribe((data) => {
      this.netIncome = data;
      console.log('netIncome', data);
    });

    this._accountSummaryService.incomeInDateRangeTotal$.subscribe((data) => {
      this.totalIncome = data;
      console.log('incomesInDateRangeTotal', data);
    });

    this._accountSummaryService.expenseInDateRangeTotal$.subscribe((data) => {
      this.totalExpense = data;
      console.log('expensesInDateRangeTotal', data);
    });

    this._accountSummaryService.purchaseInDateRangeTotal$.subscribe((data) => {
      this.totalPurchase = data;
      console.log('purchasesInDateRangeTotal', data);
    });

    this._accountSummaryService.capitalInDateRangeTotal$.subscribe((data) => {
      this.totalCapital = data;
      console.log('capitalInDateRangeTotal', data);
    });
  }
}

// ... (rest of the component code)



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];