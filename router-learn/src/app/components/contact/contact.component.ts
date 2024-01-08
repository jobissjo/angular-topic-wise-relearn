import { Component } from '@angular/core';
// import { IDeactivateComponent } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent{

  firstName:string = '';
  lastName : string = '';
  country : string = 'usa';
  message: string = '';

  isSubmitted:boolean = false;

  OnSubmit(){
    this.isSubmitted = true;
  }

  canExit(){
    if(!this.isSubmitted && (this.firstName || this.lastName || this.message)){
      return confirm('You have unsaved changes, Do you want to navigate away?')
    }else{
      return true;
    }
  }

}
