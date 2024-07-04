import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LiabilityActions } from './liability.actions';
import { catchError, exhaustMap, map, take, tap } from 'rxjs';



@Injectable()
export class LiabilityEffects {
  // props
  private _collectionName = 'liability';
  private _liabilityCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
  ) {
    this._liabilityCollection = collection(_firestore, this._collectionName);
  }

  loadLiabilitys$ = createEffect(() => 
    this._actions$.pipe(
      ofType(LiabilityActions.loadLiabilities),
      exhaustMap(() => 
        collectionData(this._liabilityCollection).pipe( 
          take(1), 
          map((liabilities:any[])=>liabilities.map(v=>({...v, date: v.date.toDate()}))),
          tap(v=>console.log('liabilities', v)),
          map((liabilities:any) => LiabilityActions.loadLiabilitiesSuccess({ liabilities })),
          //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
        )
      )
    )
  );

  // Effect to listen for real-time Firestore updates
  listenForUpdates$ = createEffect(() => 
    collectionData(this._liabilityCollection).pipe(
      tap(v=>console.log('listeforupdates', v)),
      catchError(e=>{
        console.log('error', e);
        return [];
      }),
      map((liabilities:any) => LiabilityActions.loadLiabilitiesSuccess({ liabilities })) // Dispatch success action on updates
    )
  );


  // Effect to add an income
  addLiability$ = createEffect(() =>
    this._actions$.pipe(
      ofType(LiabilityActions.addLiability),
      map((action) => action.liability),
      exhaustMap((liability) =>{
        console.log('liability', liability);
        const incomeRef = doc(this._liabilityCollection);
        const toSave = {...liability, id: incomeRef.id};
        return addDoc(this._liabilityCollection, toSave).then(
          (docRef) => {
            console.log('Document written with ID: ', docRef.id);
            return LiabilityActions.addLiabilitySuccess({ liability: toSave });
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
