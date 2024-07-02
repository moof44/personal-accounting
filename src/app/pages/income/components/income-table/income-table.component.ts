import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Income } from '../../model/income.model';

@Component({
  selector: 'app-income-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeTableComponent { 
  // Input
  @Input() dataSource$: any;
  @Input() income$!: Observable<Income[]>;
  
  // props
  displayedColumns: string[] = ['date', 'incomeSource', 'amount', 'remarks'];

}
