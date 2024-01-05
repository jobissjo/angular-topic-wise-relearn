import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit{

  selectedCourse!:Course | undefined;
  courseId!:number;
  paramsObs!:Subscription;

  constructor(private courseService:CourseService, private activateRoute:ActivatedRoute){}

  ngOnInit(){
    // this.courseId = this.activateRoute.snapshot.params['id'];
    // let idNullOrNot = this.activateRoute.snapshot.paramMap.get('id')
    // if (idNullOrNot){
    //   this.courseId = +idNullOrNot
    //   this.selectedCourse = this.courseService.courses.find((course)=> course.id == this.courseId)
    // }

    this.paramsObs = this.activateRoute.params.subscribe((data)=>{
      this.courseId = +data['id'];
      this.selectedCourse = this.courseService.courses.find((course)=> course.id == this.courseId)
    })
  }

  ngOnDestroy(){
    this.paramsObs.unsubscribe()
  }

}
