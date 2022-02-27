import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';

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
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.classStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classStudents = result;
      });

    this.getClassStudents();
  }

  getClassStudents = () => {
    this.adminService.getClassStudents(this.class.id);
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
  }

  uploadStudents = (drawer: any) => {
    this.showSlideTemplate = "UPLOAD_CLASS_STUDENTS";
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
    this.adminService.classStudents.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
