import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  constructor(private userService: UserService) { }

  login(username: string, password: string): User | undefined {
    let user = this.userService.users.find((user) => {
      return (user.username === username && user.password == password)
    });
    if (user)
      this.isLoggedIn = true;
    return user;
  }

  logout() {
    this.isLoggedIn = false;
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
}
