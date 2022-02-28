import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

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
  filteredItems: Class[] = [];
  originalClass: Class = new Class();
  selectedClass: Class = new Class();
  isNew: boolean = false;
  graduateAssistants: User[] = [];
  professors: User[] = [];
  loggedInUser: User = new User();

  constructor(
    private adminService: AdminService,
    private rootScope: RootScopeService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.rootScope.LOGGED_IN_USER.value;
    this.adminService.classes.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classes = result;
        this.filterString = '';
        this.filterItems();
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
    this.filterItems();
  }

  filterItems = () => {
    if (!CommonUtilsService.isEmpty(this.filterString)) {
      this.filteredItems = Object.assign([], this.classes).filter(
        (item: any) => item.title.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
      )
    } else {
      this.filteredItems = this.classes;
    }
  }

  add = (drawer: any) => {
    this.isNew = true;
    this.showSlideTemplate = "CREATE_CLASS";
    this.originalClass = new Class();
    this.selectedClass = new Class();
    this.slide(drawer);
  }

  edit = (drawer: any, cl: Class) => {
    this.isNew = false;
    this.showSlideTemplate = "CREATE_CLASS";
    this.originalClass = cl;
    this.selectedClass = CommonUtilsService.cloneObject(cl);
    this.slide(drawer)
  }

  gotoClassAssignments = (drawer: any, cl: Class) => {
    this.showSlideTemplate = "CLASS_ASSIGNMENTS";
    this.selectedClass = cl;
    this.slide(drawer);
  }

  gotoClassStudents = (drawer: any, cl: Class) => {
    this.showSlideTemplate = "CLASS_STUDENTS";
    this.selectedClass = cl;
    this.slide(drawer);
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.filterString = '';
      this.filterItems();
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
