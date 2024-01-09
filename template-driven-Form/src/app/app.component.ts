import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'template-driven-Form';

  @ViewChild('RegisterForm') myForm !: NgForm;
  onFormSubmitted(){
    console.log("Form is submitted", this.myForm.value);
    
  }
}
