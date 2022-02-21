import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Assignment } from 'src/app/models/assignment';
import { Class } from 'src/app/models/class';
import { Group } from 'src/app/models/group';
import { AdminService } from 'src/app/service/admin.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { User } from 'src/app/models/user';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-group-students',
  templateUrl: './group-students.component.html',
  styleUrls: ['./group-students.component.scss']
})
export class GroupStudentsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() class: Class = new Class();
  @Input() assignment: Assignment = new Assignment();
  @Input() group: Group = new Group();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  groupStudents: any[] = [];
  filteredGroupStudentsStr: string = '';
  filteredGroupStudents: any[] = [];
  classStudents: any[] = [];
  filteredClassStudentsStr: string = '';
  filteredClassStudents: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.groupStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groupStudents = result;
        this.filteredGroupStudentsStr = '';
        this.filterGroupStudents();
      });

    this.adminService.classStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classStudents = result;
        this.filteredClassStudentsStr = '';
        this.filterClassStudents();
      });

    this.getGroupStudents();
    this.getClassStudentsNotInAnyGroup();
  }

  getGroupStudents = () => {
    this.adminService.getGroupStudents(this.group.id);
  }

  getClassStudentsNotInAnyGroup = () => {
    this.adminService.getClassStudentsNotInAnyGroup(this.class.id, this.assignment.id);
  }

  applyFilter = (event: any) => {

  }

  filterGroupStudents = () => {
    this.filteredGroupStudents = this.getFilteredItems(this.filteredGroupStudentsStr, this.groupStudents);
  }

  filterClassStudents = () => {
    this.filteredClassStudents = this.getFilteredItems(this.filteredClassStudentsStr, this.classStudents);
  }

  getFilteredItems = (name: string, items: User[]) => {
    var filteredItems = [];
    if (name) {
      filteredItems = items.filter(
        (item: any) => item.firstName.toLowerCase().indexOf(name.toLowerCase()) > -1 || item.lastName.toLowerCase().indexOf(name.toLowerCase()) > -1
      )
    } else {
      filteredItems = items;
    }
    return CommonUtilsService.cloneObject(filteredItems);
  }

  drop(event: CdkDragDrop<any[]>, containerType: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,);

      if (!CommonUtilsService.isEmpty(event.item.element.nativeElement.id)) {
        if (containerType === 'GROUP') {
          this.assign(event.item.element.nativeElement.id, event.currentIndex);
        } else {
          this.unAssign(event.item.element.nativeElement.id, event.currentIndex);
        }
      }
    }
  }

  assign = (userId: string, index: number) => {
    let user = this.getUserByUserId(userId, this.classStudents);
    this.adminService.assignStudentsToGroup([{ groupId: this.group.id, studentId: user.id }], () => {
      this.classStudents.splice(this.classStudents.indexOf(user), 1);
      this.groupStudents.splice(index, 0, user);
      this.runFilters();
    });
  }

  unAssign = (userId: string, index: number) => {
    let user = this.getUserByUserId(userId, this.groupStudents);
    this.adminService.unAssignStudentsFromGroup([{ groupId: this.group.id, studentId: user.id }], () => {
      this.groupStudents.splice(this.groupStudents.indexOf(user), 1);
      this.classStudents.splice(index, 0, user);
      this.runFilters();
    });
  }

  assignSelectedStudents = () => {
    let selectedUsers = this.getSelectedUsers(this.filteredClassStudents);
    let groupStudents = this.constructFinalRequestObject(selectedUsers);
    this.adminService.assignStudentsToGroup(groupStudents,
      (response: any) => {
        this.groupStudents.push(...selectedUsers);
        this.removeUsersFromList(selectedUsers, this.classStudents);
        this.runFilters();
      });
  }

  unAssignSelectedStudents = () => {
    let selectedUsers = this.getSelectedUsers(this.filteredGroupStudents);
    let groupStudents = this.constructFinalRequestObject(selectedUsers);
    this.adminService.unAssignStudentsFromGroup(groupStudents,
      (response: any) => {
        this.classStudents.push(...selectedUsers);
        this.removeUsersFromList(selectedUsers, this.groupStudents);
        this.runFilters();
      });
  }

  runFilters = () => {
    this.filteredGroupStudentsStr = '';
    this.filterGroupStudents();
    this.filteredClassStudentsStr = '';
    this.filterClassStudents();
  }

  getUserByUserId = (userId: string, users: any[]): User => {
    return users.find(user => user.id === userId);
  }

  getSelectedUsers = (users: any[]): any[] => {
    let selectedUsers: any[] = [];
    users.forEach(user => {
      if (user.selected) {
        selectedUsers.push(user);
        delete user.selected;
      }
    });

    return selectedUsers;
  }

  removeUsersFromList = (selectedUsers: any[], allUsers: any[]) => {
    selectedUsers.forEach(user => {
      let selectedIndex = 0;
      allUsers.forEach((usr, index) => {
        if (user.id === usr.id) {
          selectedIndex = index;
        }
      });
      allUsers.splice(selectedIndex, 1);
    });
  }

  constructFinalRequestObject = (students: User[]) => {
    let groupStudents: any[] = [];
    students.forEach(st => {
      groupStudents.push({ groupId: this.group.id, studentId: st.id });
    });
    return groupStudents;
  }
}
