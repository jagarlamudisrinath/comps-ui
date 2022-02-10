import { SlimScrollDirective } from "./directives/slim-scroll.directive";
import { ElementAutoFocusDirective } from './directives/element-auto-focus.directive';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AssistantProfessorDashboardComponent } from './components/assistant-professor-dashboard/assistant-professor-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ClassesComponent } from './components/classes/classes.component';
import { UsersComponent } from './components/users/users.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClassSnippetComponent } from './components/class-snippet/class-snippet.component';
import { CUClassComponent } from './components/c-u-class/c-u-class.component';

@NgModule({
  declarations: [
    SlimScrollDirective,
    ElementAutoFocusDirective,

    AppComponent,
    AdminDashboardComponent,
    AssistantProfessorDashboardComponent,
    StudentDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    AboutComponent,
    ClassesComponent,
    UsersComponent,
    FooterComponent,
    ClassSnippetComponent,
    CUClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
