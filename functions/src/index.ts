/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

export const calculateFinancials = functions.https.onCall(
  async (data, context) => {
    return corsHandler(data, context, async()=>
      try {
        // Fetch data from Firestore collections
        const incomeDocs = await db.collection('income').get();
        const expenseDocs = await db.collection('expense').get();
        const purchaseDocs = await db.collection('purchase').get();
        const liabilityDocs = await db.collection('liability').get();
        const capitalDocs = await db.collection('capital').get();
        // Calculate totals
        let totalIncome = 0;
        let totalExpense = 0;
        let totalPurchase = 0;
        let totalLiability = 0;
        let totalCapital = 0;
        incomeDocs.forEach((doc) => {
          totalIncome += doc.data().amount || 0; // Handle potential missing 'amount' field
        });
        expenseDocs.forEach((doc) => {
          totalExpense += doc.data().amount || 0;
        });
        purchaseDocs.forEach((doc) => {
          totalPurchase += doc.data().amount || 0;
        });
        liabilityDocs.forEach((doc) => {
          totalLiability += doc.data().amount || 0;
        });
        capitalDocs.forEach((doc) => {
          totalCapital += doc.data().amount || 0;
        });
        // Return the calculated financials
        return {
          income: totalIncome,
          expense: totalExpense,
          purchase: totalPurchase,
          liability: totalLiability,
          capital: totalCapital,
        };
      } catch (error) {
        console.error('Error calculating financials:', error);
        throw new functions.https.HttpsError(
          'internal',
          'Error calculating financials'
        );
      }
    )
  }
);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
