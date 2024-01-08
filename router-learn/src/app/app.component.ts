import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'router-learn';

  showLoader:boolean = false;

  constructor(private router:Router) {}

  ngOnInit(){

    this.router.events.subscribe((routerEvent:Event) => {
      if (routerEvent instanceof NavigationStart){
        this.showLoader = true;
      }
      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError){
          
        this.showLoader = false;
      }
    })
  }
  
}
