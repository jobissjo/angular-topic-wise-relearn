import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  @Input() deleteUser!:User;
  @Output() OnConfirmation: EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirmationClick(value:boolean){
    this.OnConfirmation.emit(value)
  }
}
