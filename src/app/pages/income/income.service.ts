import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable, shareReplay } from 'rxjs';
import { Income } from './model/income.model';
import { Store } from '@ngrx/store';
import { IncomeActions } from './store/income.actions';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private _firestore = inject(Firestore);
  //private _store = inject(Store);

  // OUTPUT
  income$!: Observable<any[]>;
  incomeCollection!: CollectionReference;

  constructor() { 
    const incomeCollection = collection(this._firestore, 'income');
    this.income$ = collectionData<any>(incomeCollection)
      .pipe(
        shareReplay(1),
      );
  }

  init(){
    //this._store.dispatch(IncomeActions.loadIncomes({incomes: []}));
  }

  addIncome(data:Income) { 
    addDoc(this.incomeCollection, data)
      .then((doc: DocumentReference) => {
        console.log('addDoc', doc);
      })
  }

}
