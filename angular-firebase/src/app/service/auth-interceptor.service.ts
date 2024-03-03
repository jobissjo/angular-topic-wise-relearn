import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements  HttpInterceptor{

  constructor(private authService:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isLoggedInSub$.getValue()){
      const token = this.authService.getTokenId();
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', token)
      })
      console.log("called");
      

      return next.handle(modifiedReq);
    }
    else{
      console.log("normal called");
      
      return next.handle(req)
    }
  }
}
