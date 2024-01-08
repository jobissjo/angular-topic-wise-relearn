import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { PopularComponent } from './components/popular/popular.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { canActivateChildLogin, canActivateLogin, resolve } from './guards/auth.guard';

const routes: Routes = [
  // {path:'', redirectTo:'home', pathMatch:'full'},
  {path: '', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component:ContactComponent, canDeactivate:[(comp: ContactComponent) => {return comp.canExit()} ]},
  // 
  {path:'course', component:CoursesComponent, resolve: {course: resolve}},
  {path: 'course',canActivateChild: [canActivateChildLogin] ,children:[
    {path:'popular',component:PopularComponent},
    {path: 'checkout', component:CheckoutComponent},
    // , canActivate: [canActivateLogin]
    {path:':id',component:CourseDetailsComponent}, 
    
  ]},
  {path: 'login', component:LoginComponent},
  // {path:'course/:id', component:CourseDetailsComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // , {enableTracing:true}
  exports: [RouterModule]
})
export class AppRoutingModule { }
