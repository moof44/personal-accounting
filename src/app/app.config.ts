import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { StoreConfigModule } from './store/store-config.module';

const {projectId, appId, storageBucket, apiKey, authDomain, messagingSenderId, measurementId} = environment;

export const appConfig: ApplicationConfig = { 
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
        projectId,
        appId,
        storageBucket,
        apiKey,
        authDomain,
        messagingSenderId,
        measurementId,
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    importProvidersFrom(StoreConfigModule),
],
};
