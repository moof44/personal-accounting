import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExpenseStore } from './store/expense.store';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    CommonModule,
    ExpenseStore,
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseComponent { }
