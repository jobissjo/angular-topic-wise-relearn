import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit{
  
  tasks:string[] = []
  taskSer: TaskService = inject(TaskService);
  ngOnInit(){
    this.taskSer.createTask.subscribe((data:string)=>{
      this.tasks.push(data);
    })
  }
}
