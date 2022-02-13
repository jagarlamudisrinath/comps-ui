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
  classStudents: any[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.groupStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groupStudents = result;
      });

    this.adminService.classStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.classStudents = result;
      });

    this.getGroupStudents();
    this.getClassStudents();
  }

  getGroupStudents = () => {
    this.adminService.getGroupStudents(this.group.id, () => { });
  }

  getClassStudents = () => {
    this.adminService.getClassStudents(this.class.id, () => { });
  }

  applyFilter = (event: any) => {

  }

  drop(event: CdkDragDrop<any[]>, containerType: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,);

      /* if (!CommonUtilsService.isEmpty(event.item.element.nativeElement.id)) {
        if (containerType === 'GROUP') {
          this.assign(event.item.element.nativeElement.id);
        } else {
          this.unAssign(event.item.element.nativeElement.id);
        }
      } */
    }
  }

  assign = (userId: string) => {
    let user = this.getUserByUserId(userId, this.classStudents);
    this.adminService.assignStudentsToGroup(this.group.id, [user], () => { }, () => { });
  }

  unAssign = (userId: string) => {
    let user = this.getUserByUserId(userId, this.classStudents);
    this.adminService.unAssignStudentsFromGroup(this.group.id, [user], () => { }, () => { });
  }

  assignSelected = () => {
    let selectedUsers = this.getSelectedUsers(this.classStudents);
    this.groupStudents.push(...selectedUsers);
    selectedUsers.forEach(st => this.classStudents.splice(this.classStudents.indexOf(st), 1));
    /* this.adminService.assignStudentsToGroup(this.group.id, selectedUsers,
      (response: any) => {
        this.groupStudents.push(...selectedUsers);
        selectedUsers.forEach(st => this.classStudents.splice(this.classStudents.indexOf(st), 1));
      }, () => {

      }); */
  }

  unAssignSelected = () => {
    let selectedUsers = this.getSelectedUsers(this.groupStudents);
    this.classStudents.push(...selectedUsers);
    selectedUsers.forEach(st => this.groupStudents.splice(this.groupStudents.indexOf(st), 1));
    /* this.adminService.unAssignStudentsFromGroup(this.group.id, selectedUsers,
      (response: any) => {
        this.classStudents.push(...selectedUsers);
        selectedUsers.forEach(st => this.groupStudents.splice(this.groupStudents.indexOf(st), 1));
      }, () => {

      }); */
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
}
