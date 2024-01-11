import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learn-reactive-forms';

  reactiveForm !: FormGroup;

  ngOnInit(): void {
    this.reactiveForm  = new FormGroup({
      firstName : new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      // phoneNumber: new FormControl(null),
      dob : new FormControl(null),
      username:new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street:new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required)
      })
    })
  }

  formSubmit(){
    console.log(this.reactiveForm); 
  }
}
