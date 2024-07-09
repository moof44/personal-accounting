import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {selectAll} from '../../store/purchase.reducer';
import { PurchaseActions } from '../../store/purchase.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-add-update-purchase',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-update-purchase.component.html',
  styleUrl: './add-update-purchase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateX(-100px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class AddUpdatePurchaseComponent {
  /** INPUT **/
  // inject
  private _store = inject(Store);
  // props
  formGroup = new FormGroup({
    date: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    remarks: new FormControl(''),
  });

  /** OUTPUT **/
  purchases$ = this._store.select(selectAll)

  save() {
    if (this.formGroup.valid) {
      console.log('form', this.formGroup.value);
      this._store.dispatch(PurchaseActions.addPurchase({purchase: this.formGroup.value as any}))
    } else {
      // handle invalid form
    }
  }

  reset() {
    this.formGroup.reset();
  }
}
