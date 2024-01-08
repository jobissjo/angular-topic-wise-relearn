import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  constructor(private router:Router) {}
  course : any;
  ngOnInit(){
    this.course = this.router.lastSuccessfulNavigation?.extras.state;
  }

}
