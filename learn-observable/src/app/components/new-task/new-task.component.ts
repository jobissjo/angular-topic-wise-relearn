import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  newTask:string ='';
  constructor(private taskSer: TaskService){}

  createTask(){
    this.taskSer.onCreateTask(this.newTask)
  }
}
