import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Assignment } from 'src/app/models/assignment';
import { Class } from 'src/app/models/class';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user: User = new User();
  @Input() class: Class = new Class();
  @Input() assignment: Assignment = new Assignment();
  @Input() professor: User = new User();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  filterString: string = '';
  showGroupsTemplate: boolean = true;
  showSlideTemplate: string = "ASSIGNMENT_GROUPS";
  groups: Group[] = [];
  filteredItems: Group[] = [];
  originalGroup: Group = new Group();
  selectedGroup: Group = new Group();
  isNew: boolean = false;

  constructor(
    private commonUtils: CommonUtilsService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.adminService.assignmentGroups.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groups = result;
        this.filterString = '';
        this.filterItems();
      });

    this.getGroups();
  }

  getGroups = () => {
    this.adminService.getAssignmentGroups(this.assignment.id);
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
    this.filterItems();
  }

  filterItems = () => {
    if (!CommonUtilsService.isEmpty(this.filterString)) {
      this.filteredItems = Object.assign([], this.groups).filter(
        (item: any) => item.title.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
      )
    } else {
      this.filteredItems = this.groups;
    }
  }

  add = (drawer: any) => {
    if (this.assignment.noOfGroups === this.groups.length) {
      this.commonUtils.openSnackBar(`Unable create new group. You have reached maximum [ ${this.assignment.noOfGroups} ] groups for this assignment [ ${this.assignment.title} ].`);
    } else {
      this.isNew = true;
      this.showSlideTemplate = "CREATE_GROUP";
      this.originalGroup = new Group();
      this.originalGroup.assignmentId = this.assignment.id;
      this.selectedGroup = new Group();
      this.selectedGroup.assignmentId = this.assignment.id;
      this.slide(drawer);
    }
  }

  edit = (drawer: any, cl: Group) => {
    this.isNew = false;
    this.showSlideTemplate = "CREATE_GROUP";
    this.originalGroup = cl;
    this.selectedGroup = CommonUtilsService.cloneObject(cl);
    this.slide(drawer)
  }

  gotoGroupStudents = (drawer: any, cl: Group) => {
    this.showSlideTemplate = "GROUP_STUDENTS";
    this.selectedGroup = cl;
    this.slide(drawer);
  }

  gotoChat = (drawer: any, cl: Group) => {
    this.showSlideTemplate = "GROUP_CHAT";
    this.selectedGroup = cl;
    this.slide(drawer);
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.filterString = '';
      this.filterItems();
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
