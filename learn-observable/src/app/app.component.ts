import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, from, fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learn-observable';

  data : any[] = [];
  
  
  // Normal Observable

  // myObservable = new Observable<number>((observer)=> {
  //   setTimeout(() => {observer.next(1)}, 1000);
  //   setTimeout(() => {observer.next(2)}, 2000);
  //   setTimeout(() => {observer.next(3)}, 3000);
  //   // setTimeout(() => {observer.error(new Error('Something went wrong, please try again later'))}, 3000);
  //   setTimeout(() => {observer.next(4)}, 4000);
  //   setTimeout(() => {observer.next(5)}, 5000);
  //   setTimeout(() => {observer.complete()},6000)
  // })

  // myObservable = of(this.arr1, this.arr2,2,3,4);

  @ViewChild('clickBtn') createBtn !:ElementRef;
  @ViewChild('container') container !: ElementRef;
  createBtnObs!:any ;
  ngAfterViewInit(){
    this.buttonClicked()
  }
  buttonClicked(){
    let count = 0;
    this.createBtnObs = fromEvent(this.createBtn.nativeElement, 'click').subscribe(
      (data) => {
        console.log(data);
        this.showItem(++count)
      }
    )
  }

  showItem(val:number){
    let div = document.createElement('div');
    div.innerHTML = `Item ${val}`
    div.className = 'data-list';
    this.container.nativeElement.appendChild(div);
  }

  arr1 : number[] = [1,2,3,4,5,6];
  
  arr2 : string[] = ['a', 'b', 'c', 'd', 'e'];
  myPromise = new Promise<string[]>((resolve, reject)=>{
    resolve(this.arr2)
  })
  myObservable = from(this.myPromise)

  getAsyncDate(){
    // OLD METHOD

    // this.myObservable.subscribe((response:any)=> {
    //   this.data.push(response);
    // },
    // (err:Error)=> {
    //   alert(err.message)
    // },
    // () => {
    //   alert("All the data are received")
    // })

    // NEW METHOD

    this.myObservable.subscribe({
      // if we specify normal function for next, then this key word
      // will reference subscribe function not the current components so use arrow func
      next:(val:number | string | number[] | string[]) =>{
        this.data.push(val);
      },
      error(err){
        alert(err.message)
      },
      complete(){
        alert("All the data are streamed")
      }
    });

    
  }
}
