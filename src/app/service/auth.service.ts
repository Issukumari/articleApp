import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  register(name: string, email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password).then(async (userCredential) => {
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });

      const userRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userRef, { name, email, uid: user.uid, createdAt: new Date() });
      return user;
    }));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  getUserData(uid: string): Observable<any> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userRef).then((doc) => doc.data()));
  }

  isAuthenticated(): boolean {
    return !!this.auth.currentUser; 
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
