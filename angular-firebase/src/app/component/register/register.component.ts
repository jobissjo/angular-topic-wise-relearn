import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  authService:AuthService = inject(AuthService);

  register(){
    if (this.email == '' && !this.email.includes('@')){
      console.error("Email field is required");
      return;
    }
    if (this.password == '' && this.password.length>=8){
      console.error("Email field is required");
      return;
    }
    this.authService.register(this.email, this.password);
  }
}
