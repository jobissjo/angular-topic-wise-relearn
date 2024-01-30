import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild('forgotPasswordForm') myForm!:NgForm;

  constructor(private authService:AuthService){

  }
  forgotPassword(){
    this.authService.forgotPassword(this.myForm.value.email);
    setTimeout(()=>{
      this.myForm.reset();
    },500)
  }

}
