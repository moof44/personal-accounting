import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectAll } from '../../store/income.reducer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-income-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './income-table.component.html',
  styleUrl: './income-table.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeTableComponent { 
  /**INPUT**/
  // inject
  private _store = inject(Store);
  // props
  displayedColumns: string[] = ['date', 'incomeSource', 'amount', 'remarks'];

  /**OUTPUT**/
  dataSource$ = this._store.select(selectAll);

}
