import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  authService:AuthService = inject(AuthService);
  isLoggedIn:boolean = false;
  userSub !: Subscription;

  ngOnInit(){
    this.userSub = this.authService.userSub.subscribe((user:User) =>{
      if(user.email != 'dummy@gmail.com')
        this.isLoggedIn = !!user;
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
