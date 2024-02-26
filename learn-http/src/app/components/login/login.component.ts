import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/Models/authResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //dependency injection
  authService: AuthService = inject(AuthService);
  isLoggedInMode: boolean = true;
  isLoading: boolean = false;
  errorMsg: string = '';
  authObs$!: Observable<AuthResponse>;
  router:Router = inject(Router);

  switchMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }


  onFormSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoggedInMode) {
      this.authObs$ = this.authService.login(email, password);
    }
    else {
      console.log("signup called");
      this.isLoading = true;
      this.authObs$ = this.authService.signUp(email, password);
    }

    this.authObs$.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate([''])
      },
      error: errMsg => {
        console.log(errMsg);
        
        this.isLoading = false;
        this.errorMsg = errMsg;
        this.hideSnackbar()
      }
    })

  }

  hideSnackbar() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 3000)
  }

}
