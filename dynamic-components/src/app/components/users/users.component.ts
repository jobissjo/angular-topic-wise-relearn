import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ViewContainer } from 'src/app/directives/view-container.directive';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  showConfirmDelete: boolean = false;
  userToDelete!: User;
  onConfirmObs!:Subscription;
  @ViewChild(ViewContainer, {static:false}) container!: ViewContainer;
  constructor(private userService: UserService, private companyFacResolver:ComponentFactoryResolver) {

  }

  users: User[] = [];

  ngOnInit() {
    this.users = this.userService.users;
  }
  deleteUser(user: User) {
    this.showConfirmDelete = true;
    this.userToDelete = user;
    this.showConfirmDeleteFn(this.userToDelete)
  }

  onConfirmationDelete(value: boolean) {
    this.showConfirmDelete = false;

    if (value) {
      this.userService.deleteUser(this.userToDelete);
    }
  }

  showConfirmDeleteFn(user:User){
    const confirmDelFactory = this.companyFacResolver.resolveComponentFactory(ConfirmDeleteComponent);

    const containerViewRef = this.container?.viewContainer;

    containerViewRef.clear();

    const componentRef = containerViewRef.createComponent(confirmDelFactory);
    componentRef.instance.deleteUser= user;
    this.onConfirmObs = componentRef.instance.OnConfirmation.subscribe((data)=> {
      this.onConfirmObs.unsubscribe();
      containerViewRef.clear()
      if(data)
        this.userService.deleteUser(user);
    })
    
  }
}
