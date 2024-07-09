import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { collection } from 'firebase/firestore';
import { Observable, catchError, exhaustMap, map, of, take, tap } from 'rxjs';
import { IncomeActions } from './income.actions';
import { Store } from '@ngrx/store';



@Injectable({
  providedIn: 'root'
})
export class IncomeEffects {

  // props
  private _collectionName = 'income';
  private _incomeCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
    private _store: Store,
  ) {
    this._incomeCollection = collection(_firestore, this._collectionName);
    this._eventListener();
  }

  // event listener
  private _eventListener(){
    (collectionData(this._incomeCollection, {idField: 'id'}) as Observable<any[]>)
      .pipe(
        map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
        tap(v=>console.log('collectionData:income:', v))
      )
      .subscribe(incomes=>{
        this._store.dispatch(IncomeActions.loadIncomesSuccess({ incomes }))
      })
      
  }

  // Effect to load incomes when loadIncomes action is dispatched
  // loadIncomes$ = createEffect(() => 
  //   this._actions$.pipe(
  //     ofType(IncomeActions.loadIncomes),
  //     exhaustMap(() => 
  //       collectionData(this._incomeCollection).pipe( 
  //         take(1), 
  //         map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
  //         tap(v=>console.log('income', v)),
  //         map((incomes:any) => IncomeActions.loadIncomesSuccess({ incomes })),
  //         //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // Effect to add an income
  addIncome$ = createEffect(() =>
    this._actions$.pipe(
      ofType(IncomeActions.addIncome),
      map((action) => action.income),
      exhaustMap((income) =>{
        console.log('income', income);
        const incomeRef = doc(this._incomeCollection);
        const toSave = {...income, id: incomeRef.id};
        return addDoc(this._incomeCollection, toSave).then(
          (docRef) => {
            console.log('Document written with ID: ', docRef.id);
            return IncomeActions.addIncomeSuccess({ income: toSave });
          },
          // (error) => {
          //   console.error('Error adding document: ', error);
          //   return IncomeActions.addIncomeFailure({ error });
          // }
        )
      })
    )
  );



}
