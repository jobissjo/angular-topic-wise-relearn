import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }
  isLoggedInSub$ = new BehaviorSubject<boolean>(false);
  

  //login implementation

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then((response) => {
      response.user?.getIdToken().then((token) => {
        localStorage.setItem('token', token);
        this.isLoggedInSub$.next(true)
      })

      this.router.navigate(['dashboard']);
      if (response.user?.emailVerified) {
        this.router.navigate(['navigate'])
      }
    }, err => {
      alert('Something went wrong!!');
      this.router.navigate(['login']);
    })
  }

  autoLogin() {
    let token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSub$.next(true);
    }
  }

  register(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert("Registration Successful");
        this.router.navigate(['login']);
        this.sendEmailVerification(response.user)
      }, (err) => {
        alert(err.message)
      })
  }

  getTokenId(): string {
    let token = localStorage.getItem('token');
    if (token) {
      return token
    }
    else{
      return ''
    }
  }

  logout() {
    this.fireAuth.signOut().then((response) => {
      console.log(response);

      localStorage.removeItem('token');
    }, (err) => {
      alert(err.message)
    })
  }

  //forgot password
  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(response => {
      console.log(response);
      this.router.navigate(['verify-email'])
    }, error => {

    })
  }

  //send email verification
  sendEmailVerification(user: any) {
    user.sendEmailVerification().then((response: any) => {
      console.log(response);

      this.router.navigate(['verify-email']);
    }, (err: any) => {
      alert("SOMETHING WENT WRONG")
    });
  }
}
