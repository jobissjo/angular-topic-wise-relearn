import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/Models/task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskUrl: string = 'https://angular-http-2cf2a-default-rtdb.firebaseio.com/tasks.json';
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  taskService: TaskService = inject(TaskService);
  allTasks: Task[] = [];
  selectedTask!: Task;
  editMode: boolean = false;
  currentTaskId: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  showTaskDetail:boolean = false;
  currentTaskDetail!:Task;

  ngOnInit() {
    this.fetchAllTasks();
    this.taskService.errorSubject.subscribe({
      next:(errorResponse:HttpErrorResponse)=>{
        this.setErrorMessage(errorResponse);
      }
    })
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {
      title: '', desc: '', assignedTo: '',
      createdAt: '', priority: '', status: ''
    }
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  createTaskData(data: Task) {
    if (!this.editMode)
      this.taskService.createTask(data);
    else
      this.taskService.updateTask(this.currentTaskId, data);
    setTimeout(() => {
      this.fetchAllTasks()
    }, 1000)
  }

  fetchAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.allTasks = response;
        this.isLoading = false;
      }, error: (err) => {
        this.setErrorMessage(err)

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000)
      }
    })
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if(err.status == 401){
      this.errorMessage = "You can't perform this action in this page😒"
      this.isLoading = false;
    }
    else{
      this.errorMessage = err.message;
    }

  }

  deleteTask(id: string | undefined) {
    id && this.taskService.deleteTask(id);
    this.fetchAllTasks()
  }

  deleteAllTasks() {
    this.taskService.deleteAllTasks();
    this.fetchAllTasks()
  }

  onEditTaskClicked(id: string | undefined) {

  }

  updateTaskClicked(task: Task) {
    this.showCreateTaskForm = true;
    if (task.id)
      this.currentTaskId = task.id;
    this.selectedTask = task;
    this.editMode = true;
  }

  onClickTaskDetails(id:string | undefined){
    this.showTaskDetail = true;
    if (id){
      this.taskService.getTaskDetails(id).subscribe((response:Task)=>{
        this.currentTaskDetail = response;
      })
    }
      
  }

  closeTaskDetails(condition:boolean){
    this.showTaskDetail = !condition;
  }

}
