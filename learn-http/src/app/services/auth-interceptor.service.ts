import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { User } from "../Models/user";

export class AuthInterceptorService implements HttpInterceptor {
    authService: AuthService = inject(AuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.authService.userSub.pipe(take(1), exhaustMap((user: User) => {
            console.log(user.email);
            
            if (user.email == 'dummy@gmail.com'){
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            })
            console.log("user is authenticated", user.token)
            return next.handle(modifiedReq)
        }))

        
        // const modifiedReq = req.clone();

        // return next.handle(modifiedReq).pipe(tap((event) => {
        //     if (event.type == HttpEventType.Response) {
        //         console.log("Response has been arrived, response data", event.body);

        //     }
        // }));

    }
}