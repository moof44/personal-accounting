import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SharedTableModel } from '../model/shared-table.model';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss',
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
export class SharedTableComponent implements OnChanges{
  /**INPUT**/
  @Input() title = 'table';
  @Input() dataSource$: Observable<any[]> | null = null;
  @Input() columns: SharedTableModel[] = [];
  
  displayedColumns: string[] = ['date', 'incomeSource', 'amount', 'remarks'];

  // lifecycle
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['columns']){
      const columns = changes['columns'].currentValue;
      if(columns.length > 0){
        this.displayedColumns = columns.map((c:SharedTableModel) => c.column);
      }
    }
  } 
  // inject
  // private _store = inject(Store);
  // props

  /**OUTPUT**/
}
