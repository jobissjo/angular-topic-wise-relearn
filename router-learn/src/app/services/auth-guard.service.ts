import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ContactComponent } from '../components/contact/contact.component';
import { Course } from '../Models/course';
import { CourseService } from './course.service';

export interface IDeactivateComponent{
  canExit : ()=> boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})



export class AuthGuardService implements CanActivate, CanActivateChild,
CanDeactivate<IDeactivateComponent>, Resolve<Course[]> {
  // , 
  // Angular 14 version canActivate method
  constructor(private authService: AuthService, 
    private router: Router, private courseService:CourseService) { }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin()
  }

  checkLogin() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(this.authService.isLoggedIn);

    return this.checkLogin()
  }

  canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
     nextState: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return component.canExit();
  }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Course[] | Observable<Course[]> | Promise<Course[]> {
    return this.courseService.getAllCourses()
  }

}
