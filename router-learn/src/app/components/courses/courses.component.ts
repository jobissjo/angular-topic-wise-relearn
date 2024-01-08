import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  coursesService = inject(CourseService);
  AllCourses: Course[] = this.coursesService.courses;
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  searchString: string | null = '';
  ngOnInit() {

    // this.searchString = this.activateRoute.snapshot.queryParamMap.get('search');
    this.activateRoute.queryParamMap.subscribe((val) => {
      this.searchString = val.get('search');

      if (!this.searchString) {
        this.AllCourses = this.activateRoute.snapshot.data['course']
      }
      else {
        this.AllCourses = this.coursesService.courses.filter((course) => {
          return this.searchString && course.title.toLowerCase().includes(this.searchString.toLowerCase());
        })
      }
    })

  }

}
