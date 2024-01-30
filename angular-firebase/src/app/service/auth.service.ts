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
      if(response.user?.emailVerified == true){
        this.router.navigate(['navigate'])
      }
    }, err =>{
      alert('Something went wrong!!');
      this.router.navigate(['login']);
    })
  }

  register(email:string, password:string){
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((response)=>{
        alert("Registration Successful");
        this.router.navigate(['login']);
        this.sendEmailVerification(response.user)
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

  //forgot password
  forgotPassword(email:string){
    this.fireAuth.sendPasswordResetEmail(email).then(response=>{
      console.log(response);     
      this.router.navigate(['verify-email'])
    }, error=>{
      
    })
  }

  //send email verification
  sendEmailVerification(user:any){
    user.sendEmailVerification().then((response:any)=>{
      console.log(response);
      
      this.router.navigate(['verify-email']);
    }, (err:any)=>{
        alert("SOMETHING WENT WRONG")
    });
  }
}
