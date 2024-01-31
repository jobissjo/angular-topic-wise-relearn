import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  http:HttpClient = inject(HttpClient);
  // constructor() { }

  logError(data:{statusCode:number, errorMessage:string, datetime:Date}){
    this.http.post('https://angular-http-2cf2a-default-rtdb.firebaseio.com/log.json', data).subscribe(_response=>{

    })
  }

  fetchErrors(){
    this.http.get('https://angular-http-2cf2a-default-rtdb.firebaseio.com/log.json')
      .subscribe((data)=>{
        console.log(data);
        
      })
  }
}
