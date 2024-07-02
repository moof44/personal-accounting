import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentReference, addDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Income } from './model/income.model';
import { IncomeActions } from './store/income.actions';
import { selectAll } from './store/income.reducer';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  // inject
  private _store = inject(Store);

  constructor() { 
  }

  // OUTPUT
  income$ = this._store.select(selectAll);
  //incomeCollection!: CollectionReference;

  addIncome(data:Income) { 
    // const incomeRef = doc(this.incomeCollection);
    // const toSave = {...data, id: incomeRef.id};
    // addDoc(this.incomeCollection, toSave)
    //   .then((doc: DocumentReference) => {
    //     this._store.dispatch(IncomeActions.addIncome({income: toSave}))
    //   })

    this._store.dispatch(IncomeActions.addIncome({income: data}))
  }

  init(){
    this._store.dispatch(IncomeActions.loadIncomes())
  }

}
