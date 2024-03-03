import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'angular-firebase';
  authService:AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  ngOnDestroy(){
    this.authService.logout()
  }
}
