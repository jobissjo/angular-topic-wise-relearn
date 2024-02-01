import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../Models/task';
import { Subject, map, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from './logging.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskUrl = 'https://angular-http-2cf2a-default-rtdb.firebaseio.com/tasks.json';
  logService: LoggingService = inject(LoggingService)
  errorSubject = new Subject<HttpErrorResponse>();

  constructor(private http: HttpClient) { }

  createTask(task: Task) {
    const header = new HttpHeaders({ 'my-header': 'whatever', 'made-by': 'Jobi' })
    this.http.post(this.taskUrl,
      task, { headers: header })
      .pipe(catchError((err: HttpErrorResponse) => {
        const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
        this.logService.logError(errorObj);
        return throwError(() => err)
      }))
      .subscribe({
        next: (response) => {

        }
        // , error: (error: HttpErrorResponse) => {
        //   this.errorSubject.next(error);
        // }
      });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.taskUrl.slice(0, this.taskUrl.length - 5)}/${id}.json`)
      .pipe(catchError((err: HttpErrorResponse) => {
        const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
        this.logService.logError(errorObj);
        return throwError(() => err)
      }))
      .subscribe({
        next: (response) => {

        }
        // , error: (err: HttpErrorResponse) => {
        //   this.errorSubject.next(err);
        // }
      });
  }

  deleteAllTasks() {
    this.http.delete(this.taskUrl)
      .pipe(catchError((err: HttpErrorResponse) => {
        const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
        this.logService.logError(errorObj);
        return throwError(() => err)
      }))
      .subscribe({
        next: (_response) => {

        }
        // , error: (err: HttpErrorResponse) => {
        //   this.errorSubject.next(err);
        // }
      })
  }

  getAllTasks() {
    const headers = new HttpHeaders({ 'my-header': 'whatever', 'made-by': 'Jobi' });

    return this.http.get<{ [key: string]: Task }>(this.taskUrl,
      { headers: headers })
      .pipe(map((response) => {
        let tasks: Task[] = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            tasks.push({ ...response[key], id: key })
          }
        }
        return tasks;
      }), catchError((err: HttpErrorResponse) => {
        const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
        this.logService.logError(errorObj);
        return throwError(() => err)
      }))
  }

  updateTask(id: string, task: Task) {
    this.http.put(`${this.taskUrl.slice(0, this.taskUrl.length - 5)}/${id}.json`,
      task)
      .pipe(catchError((err: HttpErrorResponse) => {
        const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() }
        this.logService.logError(errorObj);
        return throwError(() => err)
      })).subscribe({
        next: (_response) => {

        }
        // , error: (err: HttpErrorResponse) => {
        //   this.errorSubject.next(err);
        // }
      })
  }

  getTaskDetails(id: string) {
    return this.http.get<Task>(`${this.taskUrl.slice(0, this.taskUrl.length - 5)}/${id}.json`)
      .pipe(map((response) => {
        console.log(response); 
        let task = {...response, id:id}
        return task;

      }))
  }
}
