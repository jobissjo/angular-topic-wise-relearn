import { Component } from '@angular/core';

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent {
  testimonials: string[] = ['Avery Holmes', 'Craig Ramirez', 'Landon Stephens', 'Leah Ward']
}
