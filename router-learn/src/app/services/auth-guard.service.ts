import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  // Angular 14 version canactivate method
  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.authService.isLoggedIn);
    
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
