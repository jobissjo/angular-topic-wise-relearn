import { Component } from '@angular/core';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showCreateTaskForm: boolean = false;

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  emittedTaskData(data:Task){
    console.log("Data emitted to Dashboard", data);
    
  }
}
