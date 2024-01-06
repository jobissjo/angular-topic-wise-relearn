import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
  constructor(private activateRouter:ActivatedRoute){}
  ngOnInit(){
    this.activateRouter.fragment.subscribe((data)=> {
      console.log(data);
      data && this.jumpTo(data)
    })
  }

  jumpTo(data:string){
    document.getElementById(data)?.scrollIntoView()
  }
}
