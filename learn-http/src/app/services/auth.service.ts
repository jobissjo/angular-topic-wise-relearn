import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Models/authResponse';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  error: string = ''
  private apiKey = 'AIzaSyCHG8CuaRYRxeFdFLFgwSWgnckIAwlkKuA';
  userSub = new Subject<User>();
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
  }
}
