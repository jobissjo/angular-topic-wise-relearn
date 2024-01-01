import { Component } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent {
  
  counter = interval(1000);
  subscriber :Subscription | undefined;
  data:number[] = []
  onSubscribe(){
    this.subscriber =this.counter.subscribe((val:number)=>{
      this.data.push(val)
    })
  }
  onUnsubscribe(){
    this.subscriber?.unsubscribe()
  }
}
