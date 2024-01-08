import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";
import { CourseService } from "../services/course.service";

export const canActivateLogin = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if(authService.isAuthenticated()){
        return true;
    }else{
        router.navigate(['login']);
        return false;
    }
}

export const canActivateChildLogin = () => {
    return canActivateLogin()
}

export const resolve = ()=>{
    const courseService : CourseService = inject(CourseService);
    return courseService.getAllCourses()
}