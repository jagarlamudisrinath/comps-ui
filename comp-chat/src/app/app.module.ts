import { SlimScrollDirective } from "./directives/slim-scroll.directive";
import { ElementAutoFocusDirective } from './directives/element-auto-focus.directive';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ClassesComponent } from './components/classes/classes.component';
import { UsersComponent } from './components/users/users.component';
import { CUClassComponent } from './components/c-u-class/c-u-class.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CUAssignmentComponent } from './components/c-u-assignment/c-u-assignment.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupStudentsComponent } from './components/group-students/group-students.component';
import { CUGroupComponent } from './components/c-u-group/c-u-group.component';
import { ClassStudentsComponent } from './components/class-students/class-students.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    SlimScrollDirective,
    ElementAutoFocusDirective,

    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ClassesComponent,
    UsersComponent,
    CUClassComponent,
    FileUploadComponent,
    AssignmentsComponent,
    CUAssignmentComponent,
    GroupsComponent,
    GroupStudentsComponent,
    CUGroupComponent,
    ClassStudentsComponent,
    ChatComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    NgxDropzoneModule,
    DragDropModule,
    OverlayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
