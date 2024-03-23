import { Component, inject } from '@angular/core';
import { Task } from 'src/app/datatypes';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  task:Task = {
    title: '',
    description: '',
    dueDate:''
  }
  taskService:TaskService= inject(TaskService);
  createTask(){
    // this.taskService.createTask(this.task)
    
  }
}
