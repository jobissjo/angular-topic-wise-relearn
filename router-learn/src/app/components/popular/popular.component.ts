import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent {

  courseService = inject(CourseService);
  popularCourses: Course[] = [];

  constructor(private router:Router, private activeRoute:ActivatedRoute){}
  ngOnInit(){
    this.popularCourses = this.courseService.courses.filter(c => c.rating >= 4.5);
  }

  navigateToCourse(){
    // this.router.navigate(['course'], {relativeTo:this.activeRoute});
    // this.router.navigateByUrl('/course');

    this.router.navigate(['course']);
  }

}
