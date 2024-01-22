import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Models/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitTaskDate: EventEmitter<Task> = new EventEmitter<Task>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form:NgForm){
    this.emitTaskDate.emit(form.value);
    this.CloseForm.emit(false);
    
  }
}
