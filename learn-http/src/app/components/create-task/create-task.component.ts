import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements AfterViewInit{
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitTaskDate: EventEmitter<Task> = new EventEmitter<Task>();

  @Input() isEditMode:boolean = false;
  @Input() selectedTask!:Task;

  @ViewChild('createTaskForm') TaskForm!:NgForm;
  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  

  OnFormSubmitted(form:NgForm){
    this.emitTaskDate.emit(form.value);
    this.CloseForm.emit(false);
    
  }
  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.TaskForm.form.patchValue(this.selectedTask);
    },0);
  }
}
