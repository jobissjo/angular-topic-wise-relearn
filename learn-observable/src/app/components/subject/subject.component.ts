import { Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import {ajax} from 'rxjs/ajax'

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent {

  ngOnInit(){
    // let obs = new Observable((observer) => {
    //   observer.next(Math.random())
    // })
    // const subject = new Subject()
    // const subject = new BehaviorSubject<number>(100);
    // const subject = new ReplaySubject<number>(3,2);

    // subject.subscribe((data:any) => {
    //   console.log(data);
    // })

    // subject.subscribe((data:any) => {
    //   console.log(data);
    // })
    // subject.next(2022);
    // subject.next(2023);
    // subject.next(2024);
    // subject.subscribe((data:number) => {
    //   console.log(`Subscription 3: ${data}`)
    // })

    // AJAX CALL

    // const subject = new Subject();
    // const data = ajax('https://randomuser.me/api')

    // subject.subscribe((res)=> {console.log(res)});
    // subject.subscribe((res)=> {console.log(res)});
    // subject.subscribe((res)=> {console.log(res)});

    // data.subscribe(subject)

    // ### Async Subject  ######

    // const asyncSubject = new AsyncSubject<number>();

    // asyncSubject.next(100);
    // asyncSubject.next(200);
    
    

    // asyncSubject.subscribe((data:number) => {
    //   console.log(`Subscriber 1 : ${data}`);
    // });
    // asyncSubject.next(300);
    // asyncSubject.complete();


    const promise = new Promise<number>((resolve, reject)=>{
      console.log("promise is called");
      resolve(100);
      resolve(200);
      resolve(300);
    })
    promise.then((data:number)=> {
      console.log(data);
    })

    const observable = new Observable<number>((sub) => {
      console.log("Observable is called");
      sub.next(100);
      sub.next(200);
      sub.next(300);
    })

    observable.subscribe({
      next:(data:number) => {
        console.log(`From observable subscriber ${data}`)
      }
    })

  }
}
