import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Auth Interceptor called");
        
        const modifiedReq= req.clone({headers:req.headers.append('auth', 'qwerty')})

        return next.handle(modifiedReq).pipe(tap((event)=>{
            if(event.type == HttpEventType.Response){
                console.log("Response has been arrived, response data",event.body);
                
            }
        }));
        
    }
}