import { Component, signal, computed, effect } from '@angular/core';


@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent {
  counter = signal(0);

  // message: string[] = [];
  message = signal<string[]>([])
  doubleCounter = computed(() => this.counter() * 2);
  whatever = effect(()=> console.log("Current counter value is: " + this.counter()))

constructor(){
  console.log('function log');
  
}

increment(){

  this.counter.update(() => this.counter() + 1);
  // this.message.update((prevMsg)=> [...prevMsg, 'Current counter value is: ' + this.counter()]);

  this.message.mutate((prevMsg) => prevMsg.push('Current counter value is: ' + this.counter()))

  //  this.counter.set( this.counter() + 1);
  //  this.message.push('Current counter value is: ' + this.counter());

}

decrement(){
  if (this.counter() > 0) {
    // this.counter.set(this.counter() - 1);
    this.counter.update(() => this.counter() + 1)
    this.message.mutate((preMsg) => preMsg.pop());
  }
}
}
