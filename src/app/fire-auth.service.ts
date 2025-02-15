import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public user: Observable<any> = this.userSubject.asObservable();

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      this.userSubject.next(user);
    });
  }


  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign Up method
  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Forgot Password method
  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  // Logout method
  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Get user info
  getUser() {
    return this.userSubject.value;
  }

}
