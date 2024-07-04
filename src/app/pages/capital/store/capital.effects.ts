import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CapitalActions } from './capital.actions';
import { catchError, exhaustMap, map, take, tap } from 'rxjs';



@Injectable()
export class CapitalEffects {
  // props
  private _collectionName = 'capital';
  private _capitalCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
  ) {
    this._capitalCollection = collection(_firestore, this._collectionName);
  }

  loadCapitals$ = createEffect(() => 
    this._actions$.pipe(
      ofType(CapitalActions.loadCapitals),
      exhaustMap(() => 
        collectionData(this._capitalCollection).pipe( 
          take(1), 
          map((capitals:any[])=>capitals.map(v=>({...v, date: v.date.toDate()}))),
          tap(v=>console.log('capital', v)),
          map((capitals:any) => CapitalActions.loadCapitalsSuccess({ capitals })),
          //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
        )
      )
    )
  );

  // Effect to listen for real-time Firestore updates
  listenForUpdates$ = createEffect(() => 
    collectionData(this._capitalCollection).pipe(
      tap(v=>console.log('listeforupdates', v)),
      catchError(e=>{
        console.log('error', e);
        return [];
      }),
      map((capitals:any) => CapitalActions.loadCapitalsSuccess({ capitals })) // Dispatch success action on updates
    )
  );


  // Effect to add an income
  addCapital$ = createEffect(() =>
    this._actions$.pipe(
      ofType(CapitalActions.addCapital),
      map((action) => action.capital),
      exhaustMap((capital) =>{
        console.log('capital', capital);
        const incomeRef = doc(this._capitalCollection);
        const toSave = {...capital, id: incomeRef.id};
        return addDoc(this._capitalCollection, toSave).then(
          (docRef) => {
            console.log('Document written with ID: ', docRef.id);
            return CapitalActions.addCapitalSuccess({ capital: toSave });
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
