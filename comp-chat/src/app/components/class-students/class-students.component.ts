import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-class-students',
  templateUrl: './class-students.component.html',
  styleUrls: ['./class-students.component.scss']
})
export class ClassStudentsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user: User = new User();
  @Input() class: Class = new Class();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  filterString: string = '';
  showTemplate: boolean = true;
  showSlideTemplate: string = "CLASS_STUDENTS";
  classStudents: User[] = [];
  filteredItems: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.classStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classStudents = result;
        this.filterString = '';
        this.filterItems();
      });

    this.getClassStudents();
  }

  getClassStudents = () => {
    this.adminService.getClassStudents(this.class.id);
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
    this.filterItems();
  }

  filterItems = () => {
    if (!CommonUtilsService.isEmpty(this.filterString)) {
      this.filteredItems = Object.assign([], this.classStudents).filter(
        (item: any) => item.firstName.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1 || item.lastName.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
      )
    } else {
      this.filteredItems = this.classStudents;
    }
  }

  uploadStudents = (drawer: any) => {
    this.showSlideTemplate = "UPLOAD_CLASS_STUDENTS";
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
    this.adminService.classStudents.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
