import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  showConfirmDelete:boolean = false;
  userToDelete!:User;
  constructor(private userService: UserService) {

  }

  users: User[] = [];

  ngOnInit() {
    this.users = this.userService.users;
  }
  deleteUser(user:User){
    this.showConfirmDelete = true;
    this.userToDelete = user;
  }

  onConfirmationDelete(value:boolean){
    this.showConfirmDelete = false;

    if(value){
      this.userService.deleteUser(this.userToDelete);
    }
  }
}
