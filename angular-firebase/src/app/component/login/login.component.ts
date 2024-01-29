import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private authService:AuthService){}
  signInWithGoogle() {
    console.log('whatever');
    
  }
  login() {
    if (this.email == '' && !this.email.includes('@')){
      console.error("Email field is required");
      return;
    }
    if (this.password == '' && this.password.length>=8){
      console.error("Email field is required");
      return;
    }
    this.authService.login(this.email, this.password);
  }
}
