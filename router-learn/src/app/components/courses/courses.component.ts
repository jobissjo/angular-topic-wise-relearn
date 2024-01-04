import { Component, inject } from '@angular/core';
import { Course } from 'src/app/Models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  coursesService = inject(CourseService);
  AllCourses: Course[] = this.coursesService.courses;
}
