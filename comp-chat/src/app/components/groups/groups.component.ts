import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Assignment } from 'src/app/models/assignment';
import { Class } from 'src/app/models/class';
import { Group } from 'src/app/models/group';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() class: Class = new Class();
  @Input() assignment: Assignment = new Assignment();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  filterString: string = '';
  showGroupsTemplate: boolean = true;
  showSlideTemplate: string = "ASSIGNMENT_GROUPS";
  groups: Group[] = [];
  selectedGroup: Group = new Group();

  constructor(
    private commonUtils: CommonUtilsService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.assignmentGroups.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groups = result;
      });

    this.getGroups();
  }

  getGroups = () => {
    this.adminService.getAssignmentGroups(this.assignment.id, () => { });
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
  }

  gotoGroupStudents = (drawer: any, cl: Group) => {
    this.showSlideTemplate = "GROUP_STUDENTS";
    this.selectedGroup = cl;
    this.slide(drawer);
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.showGroupsTemplate = true;
    } else {
      this.showGroupsTemplate = false;
    }
    drawer.toggle();
  }

  ngOnDestroy() {
    this.adminService.assignmentGroups.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}