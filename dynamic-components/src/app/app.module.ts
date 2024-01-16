import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { ViewContainer } from './directives/view-container.directive';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    ConfirmDeleteComponent,
    ViewContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
