import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
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
    this.userSub = this.authService.userSub.subscribe(()=>{
      this.isLoggedIn = true
    })
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
