import { inject } from "@angular/core";
import { ActivatedRouteSnapshot,  Router,  RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "../services/auth.service";

export const canActivate = (router: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>  => {
        const authService = inject(AuthService);
        const route = inject(Router);

        return authService.userSub.pipe(take(1), map((user)=> {
            const loggedIn = user.email !== 'dummy@gmail.com';

            if(loggedIn){
                return true;
            }
            else{
                return route.createUrlTree(['login'])
            }
        }))
    }