import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Models/task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskUrl = 'https://angular-http-2cf2a-default-rtdb.firebaseio.com/tasks.json';
  constructor(private http: HttpClient) { }

  createTask(task: Task) {
    const header = new HttpHeaders({ 'my-header': 'whatever', 'made-by': 'Jobi' })
    this.http.post(this.taskUrl,
      task, { headers: header }).subscribe((response) => {
        console.log(response);
      });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.taskUrl.slice(0, this.taskUrl.length - 5)}/${id}.json`)
      .subscribe((data) => {
        console.log(data);

      });
  }

  deleteAllTasks(){
    this.http.delete(this.taskUrl)
      .subscribe((response)=>{

      })
  }

  getAllTasks(){
    const headers = new HttpHeaders({ 'my-header': 'whatever', 'made-by': 'Jobi' });

    return this.http.get<{[key:string]:Task}>(this.taskUrl, 
      {headers:headers})
      .pipe(map((response)=> {
        let tasks:Task[] = [];
        for(let key in response){
          if(response.hasOwnProperty(key)){
            tasks.push({...response[key],id:key})
          }
        }
        return tasks;
      }))
  }

  updateTask(id:string, task:Task){
    this.http.put(`${this.taskUrl.slice(0, this.taskUrl.length - 5)}/${id}.json`, 
    task).subscribe((response)=>{
      console.log(response);
      
    })
  }
}
