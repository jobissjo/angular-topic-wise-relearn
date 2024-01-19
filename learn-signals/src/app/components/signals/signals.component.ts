import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent {
  counter = signal(0);

  message: string[] = [];

  increment(){
  //  this.counter.set( this.counter() + 1);
  this.counter.update(()=> this.counter() + 1);
   this.message.push('Current counter value is: ' + this.counter());
  }

  decrement(){
    if (this.counter() > 0){
      // this.counter.set(this.counter() - 1);
      this.counter.update(()=> this.counter() + 1)
      this.message.pop();
    }
  }
}
