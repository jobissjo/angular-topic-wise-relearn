import { Component, inject } from '@angular/core';
import { Task } from 'src/app/datatypes';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent {
  tasks:Task[] = []
  taskService:TaskService = inject(TaskService);

  ngOnInit(){
    this.taskService.getAllTask('whatever').subscribe(res => {
      console.log(res);
      
      this.tasks = res;
    })
  }
}
