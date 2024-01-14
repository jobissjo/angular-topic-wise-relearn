import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators/customValidators.validator';
import { UserForm } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learn-reactive-forms';

  reactiveForm !: FormGroup;
  skillsFormArray!: FormArray;
  experienceArray!: FormArray;
  userForm!: UserForm;


  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, CustomValidators.noSpaceAllowed]),
      lastName: new FormControl('', [Validators.required, CustomValidators.noSpaceAllowed]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl(null),
      username: new FormControl(null, Validators.required, CustomValidators.usernameCheck),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required)
      }),
      skills: new FormArray<FormControl>([
        new FormControl('', Validators.required),
      ]),
      experience: new FormArray([
        new FormGroup({
          company: new FormControl(null),
          position: new FormControl(null),
          totalExp: new FormControl(null),
          startDate: new FormControl(null),
          endDate: new FormControl(null)
        })
      ])
    })

    this.skillsFormArray = this.reactiveForm.get('skills') as FormArray;
    this.experienceArray = this.reactiveForm.get('experience') as FormArray;

    // console.log(this.reactiveForm);
    // this.reactiveForm.get('firstName').valueChanges.subscribe((data) => {
    //   console.log(data);  
    // })

    // this.reactiveForm.valueChanges.subscribe((data)=> {
    //   console.log(data);   
    // })

    this.reactiveForm.get('username').statusChanges.subscribe((data) => {
      console.log(data);

    })

  }
  addSkills() {
    // (<FormArray>this.reactiveForm.get('skills'))
    //          .push(new FormControl(null, Validators.required));
    this.skillsFormArray.push(new FormControl(null, Validators.required));
  }

  deleteSkill(index: number) {
    this.skillsFormArray.removeAt(index);
  }

  addExperience() {
    let formGroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null)
    })
    this.experienceArray.push(formGroup);
  }

  deleteExp(index: number) {
    this.experienceArray.removeAt(index)
  }

  formSubmit() {
    console.log(this.reactiveForm.value);
    this.userForm = this.reactiveForm.value;
  }
  getUsername() {
    console.log('username');
    
    let userName:string = '';

    const fName:string = this.reactiveForm.get('firstName').value;
    const lName = this.reactiveForm.get('lastName').value;
    const dob = this.reactiveForm.get('dob').value;

    if (fName.length >= 3) {
      userName += fName.slice(0, 3);
    }
    else {
      userName = userName + fName;
    }
    if (lName.length >= 3) {
      userName = userName + lName.slice(0, 3);
    }
    else {
      userName += lName;
    }
    let dateTime = new Date(dob); 
    userName += dateTime.getFullYear();
    userName = userName.toLowerCase();

    this.reactiveForm.patchValue({
      username:userName
    })
  }
}
