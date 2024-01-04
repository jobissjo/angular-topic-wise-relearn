import { Component, inject } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  servicesService = inject(ServicesService);
  services: { title: string, image: string, description: string }[] = [];

  ngOnInit() {
    this.services = this.servicesService.services;
  }
}
