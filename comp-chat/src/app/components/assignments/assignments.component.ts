import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Assignment } from 'src/app/models/assignment';
import { Class } from 'src/app/models/class';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user: User = new User();
  @Input() class: Class = new Class();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  filterString: string = '';
  showAssignmentsTemplate: boolean = true;
  showSlideTemplate: string = "CLASS_ASSIGNMENTS";
  assignments: Assignment[] = [];
  filteredItems: Assignment[] = [];
  originalAssignment: Assignment = new Assignment();
  selectedAssignment: Assignment = new Assignment();
  isNew: boolean = false;

  studentGroup: Group = new Group();
  professor: User = new User();

  constructor(
    private adminService: AdminService,
    private rootScope: RootScopeService,
    private commonUtils: CommonUtilsService
  ) { }

  ngOnInit(): void {
    this.adminService.classAssignments.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.assignments = result;
        this.filterString = '';
        this.filterItems();
      });

    this.getProfessorById();
    this.getAssignments();
  }

  getAssignments = () => {
    this.adminService.getClassAssignments(this.class.id);
  }

  getProfessorById = () => {
    this.adminService.getUserById(this.class.profId,
      (user: User) => {
        this.professor = user;
      });
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
    this.filterItems();
  }

  filterItems = () => {
    if (!CommonUtilsService.isEmpty(this.filterString)) {
      this.filteredItems = Object.assign([], this.assignments).filter(
        (item: any) => item.title.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1
      )
    } else {
      this.filteredItems = this.assignments;
    }
  }

  add = (drawer: any) => {
    this.isNew = true;
    this.showSlideTemplate = "CREATE_ASSIGNMENT";
    this.originalAssignment = new Assignment();
    this.originalAssignment.classId = this.class.id;
    this.selectedAssignment = new Assignment();
    this.selectedAssignment.classId = this.class.id;
    this.slide(drawer);
  }

  edit = (drawer: any, cl: Assignment) => {
    this.isNew = false;
    this.showSlideTemplate = "CREATE_ASSIGNMENT";
    this.originalAssignment = cl;
    this.selectedAssignment = CommonUtilsService.cloneObject(cl);
    this.slide(drawer)
  }

  downloadAssignmentFile = (drawer: any, cl: Assignment) => {
    let url = this.rootScope.APP_ROOT_URL + '/assignments/' + cl.id + '/fileDownload';
    window.location.href = url;
  }

  gotoAssignmentGroups = (drawer: any, cl: Assignment) => {
    this.showSlideTemplate = "ASSIGNMENT_GROUPS";
    this.selectedAssignment = cl;
    this.slide(drawer);
  }

  gotoChat = (drawer: any, cl: Assignment) => {
    this.studentGroup = new Group();
    this.selectedAssignment = cl;
    this.prepareChatComponents(drawer);
  }

  prepareChatComponents = (drawer: any) => {
    this.adminService.returnGroupsByStudentId(this.selectedAssignment.id, this.user.id,
      (groups: Group[]) => {
        if (CommonUtilsService.isEmpty(groups)) {
          this.commonUtils.openSnackBar(`Student [ ${this.user.firstName} ${this.user.lastName} ] is not assigned to any group in assignment [ ${this.selectedAssignment.title} ].`)
        } else {
          this.studentGroup = groups[0];
          this.showSlideTemplate = "GROUP_CHAT";
          this.slide(drawer);
        }
      });
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.filterString = '';
      this.filterItems();
      this.showAssignmentsTemplate = true;
    } else {
      this.showAssignmentsTemplate = false;
    }
    drawer.toggle();
  }

  ngOnDestroy() {
    this.adminService.classAssignments.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
