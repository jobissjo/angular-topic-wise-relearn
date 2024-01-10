import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GenderType, PersonDetails } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'template-driven-Form';

  firstName: string = '';
  lastName: string = '';
  dob: string = '';

  personDetails!:PersonDetails;

  genders: GenderType[] = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'Prefer not to say' },
  ]

  @ViewChild('RegisterForm') myForm !: NgForm;
  
  uname: string = '';
  showUserMessage: boolean = false;
  isSuccess: boolean = false;
  message: string = '';
  isPersonDetailAvailable :boolean = false;

  createUsername(username: string) {
    this.showUserMessage = true;
    if (username.toLowerCase() === 'jo') {
      this.message = 'username already exist'
    }
    else if (username) {
      this.message = 'username created successfully';
      this.isSuccess = true;
    }
    else {
      let dateTime = new Date(this.dob)
      let userName = this.firstName + this.lastName + dateTime.getFullYear();

      

      this.myForm.form.patchValue({
        userName:userName
      })
      this.message = 'username created successfully';
    }
    console.log(this.message);

    setTimeout(() => { this.showUserMessage = false }, 5000)
  }

  onFormSubmitted() {
    if (this.myForm.valid) {
      console.log('Form is valid');
      this.personDetails = this.myForm.value;
      this.isPersonDetailAvailable = true;
      this.myForm.reset()
    }
  }


}
