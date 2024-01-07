import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

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