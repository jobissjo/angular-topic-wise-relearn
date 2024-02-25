import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoggingInterceptorService } from './services/loggin-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/utility/loader/loader.component';
import { SnackbarComponent } from './components/utility/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    LoginComponent,
    LoaderComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true },
    {provide:HTTP_INTERCEPTORS, useClass:LoggingInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
