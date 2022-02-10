import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  filterString: string = '';
  showTemplate: boolean = true;
  showSlideTemplate: string = "CLASSES";
  classes: Class[] = [];
  originalClass: Class = new Class();
  selectedClass: Class = new Class();
  isNew: boolean = false;
  graduateAssistants: User[] = [];
  professors: User[] = [];

  constructor(
    private commonUtils: CommonUtilsService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.classes.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classes = result;
      });

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

    this.getClasses();
    this.getProfessors();
    this.getGraduateAssistants();
  }

  getClasses = () => {
    this.adminService.getClasses();
  }

  getProfessors = () => {
    this.adminService.getProfessors();
  }

  getGraduateAssistants = () => {
    this.adminService.getGraduateAssistants();
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
  }

  add = (drawer: any) => {
    this.isNew = true;
    this.showSlideTemplate = "CLASSES";
    this.originalClass = new Class();
    this.selectedClass = new Class();
    this.slide(drawer);
  }

  edit = (drawer: any, cl: Class) => {
    this.isNew = false;
    this.showSlideTemplate = "CLASSES";
    this.originalClass = cl;
    this.selectedClass = CommonUtilsService.cloneObject(cl);
    this.slide(drawer)
  }

  delete = (cl: Class) => {
    let fail: any;
    this.adminService.deleteClass(cl, fail);
  }

  gotoClassAssignments = (drawer: any, cl: Class) => {
    this.showSlideTemplate = "CLASS_ASSIGNMENTS";
    this.selectedClass = cl;
    this.slide(drawer);
  }

  gotoAssignments = (cl: any) => {
    this.showSlideTemplate = "CLASS_ASSIGNMENTS";
    this.selectedClass = cl;
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
    this.adminService.classes.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
