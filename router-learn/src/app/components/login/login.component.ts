import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }


  ngOnInit() {
    this.activeRoute.queryParamMap.subscribe((query) => {
      const logout = Boolean(query.get('logout'));
      if (logout) {
        this.authService.logout();
        alert(`Your are now logged out. IsLoggedIn =  ${this.authService.isLoggedIn}`)
      }
    })
  }
  @ViewChild('username') username !: ElementRef<HTMLInputElement>;
  @ViewChild('password') password !: ElementRef<HTMLInputElement>;

  onLoginClicked() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    const user = this.authService.login(username, password)

    if (!user) {
      alert("Your login credential are wrong");
    }
    else {
      alert(`Welcome ${user.name} You are logged in.`);
      this.router.navigate(['home'])
    }
  }
}
