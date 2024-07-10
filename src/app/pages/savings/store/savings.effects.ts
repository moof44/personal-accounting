import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SavingActions } from './savings.actions';
import { Observable, catchError, exhaustMap, map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';



@Injectable()
export class SavingEffects {
  // props
  private _collectionName = 'saving';
  private _savingCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
    private _store: Store,
  ) {
    this._savingCollection = collection(_firestore, this._collectionName);
    this._eventListener();
  }

  loadSavings$ = createEffect(() => 
    this._actions$.pipe(
      ofType(SavingActions.loadSavings),
      exhaustMap(() => 
        collectionData(this._savingCollection).pipe( 
          take(1), 
          map((savings:any[])=>savings.map(v=>({...v, date: v.date.toDate()}))),
          //tap(v=>console.log('saving', v)),
          map((savings:any) => SavingActions.loadSavingsSuccess({ savings })),
          //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
        )
      )
    )
  );

  private _eventListener(){
    (collectionData(this._savingCollection, {idField: 'id'}) as Observable<any[]>)
      .pipe(
        map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
        //tap(v=>console.log('collectionData:purchase:', v))
      )
      .subscribe(savings=>{
        this._store.dispatch(SavingActions.loadSavingsSuccess({ savings }))
      })
  }

  // Effect to listen for real-time Firestore updates
  // listenForUpdates$ = createEffect(() => 
  //   collectionData(this._savingCollection).pipe(
  //     tap(v=>console.log('listeforupdates', v)),
  //     catchError(e=>{
  //       console.log('error', e);
  //       return [];
  //     }),
  //     map((savings:any) => SavingActions.loadSavingsSuccess({ savings })) // Dispatch success action on updates
  //   )
  // );


  // Effect to add an income
  addSaving$ = createEffect(() =>
    this._actions$.pipe(
      ofType(SavingActions.addSaving),
      map((action) => action.saving),
      exhaustMap((saving) =>{
        //console.log('saving', saving);
        const incomeRef = doc(this._savingCollection);
        const toSave = {...saving, id: incomeRef.id};
        return addDoc(this._savingCollection, toSave).then(
          (docRef) => {
            //console.log('Document written with ID: ', docRef.id);
            return SavingActions.addSavingSuccess({ saving: toSave });
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
