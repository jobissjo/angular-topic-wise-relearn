import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/Models/task';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  taskUrl:string = 'https://angular-http-2cf2a-default-rtdb.firebaseio.com/tasks.json';
  showCreateTaskForm: boolean = false;
  http:HttpClient = inject(HttpClient);

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

  emittedTaskData(data:Task){
    
    const header = new HttpHeaders({'my-header':'whatever', 'made-by': 'jobi'})
    this.http.post(this.taskUrl, 
    data, {headers:header}).subscribe((response)=>{
        console.log(response);
        this.fetchAllTasks() 
    });
  }

  fetchAllTasks(){
    const header = new HttpHeaders({'my-header':'whatever', 'made-by': 'jobi'})
    this.http.get<{[key:string]:Task}>(this.taskUrl, {headers:header})
    .pipe(map((response)=>{
      let tasks = [];
      for(let key in response){
        
        if(response.hasOwnProperty(key)){
          tasks.push({...response[key], id:key})}
      }
      return tasks
    })).subscribe((response)=>{
      this.allTasks = response;
    })
  }

  deleteTask(id:string|undefined){
    console.log(id);
    
    this.http.delete(`${this.taskUrl.slice(0,this.taskUrl.length-5)}/${id}.json`).subscribe((data)=>{
      console.log(data);
      
    });
    this.fetchAllTasks()
  }

  deleteAllTasks(){
    this.http.delete(`${this.taskUrl}`).subscribe((response)=>{
      this.fetchAllTasks()
    })
  }

}
