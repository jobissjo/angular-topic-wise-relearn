import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { ShowTaskComponent } from './components/show-task/show-task.component';
import { FormsModule } from '@angular/forms';
import { SubjectComponent } from './components/subject/subject.component';
import { ServicesComponent } from './components/services/services.component';
import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    ShowTaskComponent,
    SubjectComponent,
    ServicesComponent,
    UnsubscribeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
