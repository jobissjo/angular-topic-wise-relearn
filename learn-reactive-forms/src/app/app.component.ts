import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'learn-reactive-forms';

  reactiveForm !: FormGroup;
  skillsFormArray!:FormArray;

  
  ngOnInit(): void {
    this.reactiveForm  = new FormGroup({
      firstName : new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      dob : new FormControl(null),
      username:new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street:new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required)
      }),
      skills: new FormArray<FormControl>([
        new FormControl('', Validators.required),
      ])
    })

    this.skillsFormArray = this.reactiveForm.get('skills') as FormArray;
  }  
  addSkills(){
    // (<FormArray>this.reactiveForm.get('skills'))
    //          .push(new FormControl(null, Validators.required));
    this.skillsFormArray.push(new FormControl(null, Validators.required));
  }

  deleteSkill(index:number){
    this.skillsFormArray.removeAt(index);
  }

  formSubmit(){
    console.log(this.reactiveForm); 
  }
}
