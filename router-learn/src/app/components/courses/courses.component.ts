import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  coursesService = inject(CourseService);
  AllCourses: Course[] = this.coursesService.courses;
  activateRoute:ActivatedRoute = inject(ActivatedRoute);
  
  ngOnInit(){
    let query :string | null = this.activateRoute.snapshot.queryParamMap.get('search');
    console.log(query); 
  }

}
