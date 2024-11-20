import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { articleReducer } from './app/store/article.reducer';
import { provideEffects } from '@ngrx/effects';
import { ArticleEffects } from './app/store/article.effects';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: "AIzaSyCk1qrViAmIcNBpP5ntUwaDuLl6rlgyQAg",
  authDomain: "article-fd065.firebaseapp.com",
  projectId: "article-fd065",
  storageBucket: "article-fd065.firebasestorage.app",
  messagingSenderId: "322476443445",
  appId: "1:322476443445:web:ee07d78764cc23dbebae7c",
  measurementId: "G-JV9T8V41NC"
};

bootstrapApplication(AppComponent, {
  //   providers: [
//     provideRouter(routes),
//     provideStore({ articles: articleReducer }), // Key 'articles' must match
//     provideEffects([ArticleEffects]),
//     provideHttpClient(),
//   ],
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore({ articles: articleReducer }),
    provideEffects([ArticleEffects]),
    provideHttpClient(),
]
}).catch(err => console.error(err));
