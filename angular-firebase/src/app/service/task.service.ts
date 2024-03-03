import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../datatypes';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private databaseLink = "https://learn-angular-firebase-ef108-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) { }

  createTask(task: Task) {
    this.http.post(`${this.databaseLink}task.json`, task).subscribe((res) => {
      console.log(res);

    })
  }

  getAllTask(id: string) {
    return this.http.get<{ [key: string]: Task }>(`${this.databaseLink}task.json`).pipe(
      map((response) => {
        let tasks: Task[] = [];

        for (let key in response) {        
          if (response.hasOwnProperty(key)) {
            tasks.push({...response[key], id:key})
          }
        }
        return tasks
      })
    )
  }
}
