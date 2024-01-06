import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
  // searchVar: string = '';
  constructor(private router:Router){}
  onSearchClick(value:string){
    this.router.navigate(['/course'], {queryParams: {search:value}})
  }
}
