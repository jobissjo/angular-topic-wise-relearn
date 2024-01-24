import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/Models/task';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  taskUrl:string = 'https://angular-http-2cf2a-default-rtdb.firebaseio.com/tasks.json';
  showCreateTaskForm: boolean = false;
  http:HttpClient = inject(HttpClient);
  taskSer:TaskService = inject(TaskService);
  allTasks:Task[]= [];
  
  ngOnInit(){
    this.fetchAllTasks();
  }

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }

  createTaskData(data:Task){
    
    this.taskSer.createTask(data);
    setTimeout(()=>{
      this.fetchAllTasks()
    },1000)
  }

  fetchAllTasks(){
    this.taskSer.getAllTasks().subscribe((response)=>{
      this.allTasks = response;
    })
  }

  deleteTask(id:string|undefined){
    id && this.taskSer.deleteTask(id);
    this.fetchAllTasks()
  }

  deleteAllTasks(){
    this.taskSer.deleteAllTasks();
    this.fetchAllTasks()
  }

  onEditTaskClicked(id:string | undefined){
    
  }

}
