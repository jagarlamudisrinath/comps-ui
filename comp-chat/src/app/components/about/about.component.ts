import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: User = new User();
  showTemplate: boolean = true;
  showSlideTemplate: string = "ABOUT";
  isNew: boolean = true;
  originalClass: Class = new Class();
  selectedClass: Class = new Class();
  graduateAssistants: User[] = [];
  professors: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.user.firstName = "Test";
    this.user.lastName = "Admin";
    this.user.email = "test_email@email.com";

    this.adminService.professors.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.professors = result;
      });

    this.adminService.graduateAssistants.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.graduateAssistants = result;
      });

    this.getProfessors();
    this.getGraduateAssistants();
  }

  getProfessors = () => {
    this.adminService.getProfessors();
  }

  getGraduateAssistants = () => {
    this.adminService.getGraduateAssistants();
  }

  addClass = (drawer: any) => {
    this.isNew = true;
    this.showSlideTemplate = "CREATE_CLASS";
    this.originalClass = new Class();
    this.selectedClass = new Class();
    this.slide(drawer);
  }

  addUser = (drawer: any) => {
    this.isNew = true;
    this.showSlideTemplate = "CREATE_USER";
    this.slide(drawer);
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.showTemplate = true;
    } else {
      this.showTemplate = false;
    }
    drawer.toggle();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
