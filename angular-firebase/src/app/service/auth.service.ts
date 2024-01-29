import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth:AngularFireAuth, private router:Router) { }

  //login implementation

  login(email:string, password:string){
    this.fireAuth.signInWithEmailAndPassword(email,password).then((response)=>{
      console.log(response);
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);
    }, err =>{
      alert('Something went wrong!!');
      this.router.navigate(['login']);
    })
  }

  register(email:string, password:string){
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((response)=>{
        console.log(response);
        
        alert("Registration Successful");
        this.router.navigate(['login']);
      }, (err) => {
        alert(err.message)
      })
  }

  logout(){
    this.fireAuth.signOut().then((response)=>{
      console.log(response);
      
      localStorage.removeItem('token');
    }, (err)=>{
      alert(err.message)
    })
  }
}
