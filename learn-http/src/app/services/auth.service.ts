import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Models/authResponse';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router:Router = inject(Router);
  timerFunctionId:any;
  error: string = ''
  private apiKey = 'AIzaSyCHG8CuaRYRxeFdFLFgwSWgnckIAwlkKuA';
  user = new User('dummy@gmail.com', '32423', 'fdsfgdskj234324', new Date());
  userSub = new BehaviorSubject<User>(this.user);
  // constructor() { }
  signUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }

    return this.http.post<AuthResponse>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey,
      data
    ).pipe(catchError(err => {
      return this.handleErr(err)
    }),
      tap((res) => {
        this.handleCreateUser(res);
      }))
  }
  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true }
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey,
      data).pipe(catchError(err => {
        return this.handleErr(err)
      }),
        tap((res) => {
          this.handleCreateUser(res);
        }))
  }

  logOut(){
    this.userSub.next(this.user);
    localStorage.removeItem('user');
    this.router.navigate(['login']);

    if(this.timerFunctionId){
      clearTimeout(this.timerFunctionId)
    }
    
  }

  autoLogin(){
    let user = localStorage.getItem('user');

    if(user){
      let tempUser = JSON.parse(user)
      const userObj = new User(tempUser.email, tempUser.id, tempUser._token, tempUser._expiresIn);

      if(userObj.token){
        this.userSub.next(userObj);
        let expireTime =  tempUser._expiresIn -  new Date().getTime() ;
        this.autoLogout(expireTime);
      }
    }
    // const user = JSON.parse()
    
  }

  autoLogout(expiresTime:number){
    this.timerFunctionId = setTimeout(()=> {
      this.logOut();
    }, expiresTime)
  }

  private handleErr(err: any) {

    let errorMsg = "The unknown occurred";
    if (!err.error?.error) {
      return throwError(() => errorMsg)
    }
    switch (err.error.error.message) {

      case "EMAIL_EXISTS":
        errorMsg = 'The email already exists'
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "This operation is not allowed"
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMsg = "This email or password is not correct"
        break;

    }
    return throwError(() => errorMsg);
  }

  private handleCreateUser(res: AuthResponse) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.userSub.next(user);
    this.autoLogout(res.expiresIn * 1000)

    localStorage.setItem('user', JSON.stringify(user));
  }
}
