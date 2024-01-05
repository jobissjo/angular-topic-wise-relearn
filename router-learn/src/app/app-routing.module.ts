import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
  // {path:'', redirectTo:'home', pathMatch:'full'},
  {path: '', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'course', component:CoursesComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactComponent},
  {path:'course/:id', component:CourseDetailsComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
