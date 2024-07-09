import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc } from '@angular/fire/firestore';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PurchaseActions } from './purchase.actions';
import { Observable, catchError, exhaustMap, map, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';



@Injectable()
export class PurchaseEffects {
  // props
  private _collectionName = 'purchase';
  private _purchaseCollection!: CollectionReference;

  constructor(
    private _actions$: Actions,
    private _firestore: Firestore,
    private _store: Store,
  ) {
    this._purchaseCollection = collection(_firestore, this._collectionName);
    this._eventListener();
  }

  loadPurchases$ = createEffect(() => 
    this._actions$.pipe(
      ofType(PurchaseActions.loadPurchases),
      exhaustMap(() => 
        collectionData(this._purchaseCollection).pipe( 
          take(1), 
          map((purchases:any[])=>purchases.map(v=>({...v, date: v.date.toDate()}))),
          tap(v=>console.log('purchase', v)),
          map((purchases:any) => PurchaseActions.loadPurchasesSuccess({ purchases })),
          //catchError(error => of(IncomeActions.loadIncomesFailure({ error })))
        )
      )
    )
  );

  private _eventListener(){
    (collectionData(this._purchaseCollection, {idField: 'id'}) as Observable<any[]>)
      .pipe(
        map((incomes:any[])=>incomes.map(v=>({...v, date: v.date.toDate()}))),
        tap(v=>console.log('collectionData:purchase:', v))
      )
      .subscribe(purchases=>{
        this._store.dispatch(PurchaseActions.loadPurchasesSuccess({ purchases }))
      })
      
  }

  // Effect to listen for real-time Firestore updates
  // listenForUpdates$ = createEffect(() => 
  //   collectionData(this._purchaseCollection).pipe(
  //     tap(v=>console.log('listeforupdates', v)),
  //     catchError(e=>{
  //       console.log('error', e);
  //       return [];
  //     }),
  //     map((purchases:any) => PurchaseActions.loadPurchasesSuccess({ purchases })) // Dispatch success action on updates
  //   )
  // );


  // Effect to add an income
  addPurchase$ = createEffect(() =>
    this._actions$.pipe(
      ofType(PurchaseActions.addPurchase),
      map((action) => action.purchase),
      exhaustMap((purchase) =>{
        console.log('purchase', purchase);
        const incomeRef = doc(this._purchaseCollection);
        const toSave = {...purchase, id: incomeRef.id};
        return addDoc(this._purchaseCollection, toSave).then(
          (docRef) => {
            console.log('Document written with ID: ', docRef.id);
            return PurchaseActions.addPurchaseSuccess({ purchase: toSave });
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
