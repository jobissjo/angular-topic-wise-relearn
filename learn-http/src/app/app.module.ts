import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import {  HttpClientModule } from '@angular/common/http';
// import { LoaderComponent } from './components/utility/loader/loader.component';
// import { SnackbarComponent } from './components/utility/snackbar/snackbar.component';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from './core.module';
import { SharedModule } from './shared.module';
import { AuthModule } from './login/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
