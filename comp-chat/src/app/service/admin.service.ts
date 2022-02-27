import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../enums/user-type';
import { Assignment } from '../models/assignment';
import { Class } from '../models/class';
import { Group } from '../models/group';
import { User } from '../models/user';
import { CommonUtilsService } from '../services/common-utils.service';
import { ResourcesService } from '../services/resources.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  classes: BehaviorSubject<Class[]> = new BehaviorSubject<Class[]>([]);
  professors: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  graduateAssistants: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  classAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);
  assignmentGroups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  groupStudents: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  classStudents: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private resources: ResourcesService, private commonUtils: CommonUtilsService) { }

  getUsers = () => {
    this.resources.getUsers(
      (response: User[]) => {
        this.users.next(response);
      }, (response: any) => {
        this.users.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  uploadUsers = (formData: any, s: any) => {
    this.resources.uploadUsers(formData,
      (response: any) => {
        this.getUsers();
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  getClasses = () => {
    this.resources.getClasses(
      (response: Class[]) => {
        this.classes.next(response);
      }, (response: any) => {
        this.classes.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  createOrUpdateClass = (cl: Class, s: any) => {
    this.resources.createOrUpdateClass(cl,
      (response: Class) => {
        this.getClasses();
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  getProfessors = () => {
    this.resources.getUsersByType(UserType.PROFESSOR,
      (response: User[]) => {
        this.professors.next(response);
      }, (response: any) => {
        this.professors.next([]);
        this.commonUtils.openSnackBar(response)
      });
  }

  getGraduateAssistants = () => {
    this.resources.getUsersByType(UserType.STUDENT,
      (response: User[]) => {
        this.graduateAssistants.next(response);
      }, (response: any) => {
        this.graduateAssistants.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  getClassStudents = (classId: string) => {
    this.resources.getClassStudents(classId,
      (response: User[]) => {
        this.classStudents.next(response);
      }, (response: any) => {
        this.classStudents.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  uploadStudentsToClass = (classId: string, formData: any, s: any) => {
    this.resources.uploadStudentsToClass(classId, formData,
      (response: any) => {
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  getClassAssignments = (classId: string) => {
    this.resources.getClassAssignments(classId,
      (response: Assignment[]) => {
        this.classAssignments.next(response);
      }, (response: any) => {
        this.classAssignments.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  createOrUpdateAssignment = (cl: Assignment, formData: any, s: any) => {
    this.resources.createOrUpdateAssignment(cl, formData,
      (response: any) => {
        this.getClassAssignments(cl.classId);
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  getAssignmentGroups = (assignmentId: string) => {
    this.resources.getAssignmentGroups(assignmentId,
      (response: Group[]) => {
        this.assignmentGroups.next(response);
      }, (response: any) => {
        this.assignmentGroups.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  returnGroupsByStudentId = (assignmentId: string, studentId: string, s: any) => {
    this.resources.returnGroupsByStudentId(assignmentId, studentId,
      (response: Group[]) => {
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  createOrUpdateGroup = (classId: string, assignmentId: string, group: Group, s: any) => {
    this.resources.createOrUpdateGroup(classId, assignmentId, group,
      (response: Group) => {
        s(response);
        this.getAssignmentGroups(assignmentId);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  getGroupStudents = (groupId: string) => {
    this.resources.getGroupStudents(groupId,
      (response: User[]) => {
        this.groupStudents.next(response);
      }, (response: any) => {
        this.groupStudents.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  getClassStudentsNotInAnyGroup = (classId: string, assignmentId: string) => {
    this.resources.getClassStudentsNotInAnyGroup(classId, assignmentId,
      (response: User[]) => {
        this.classStudents.next(response);
      }, (response: any) => {
        this.classStudents.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  assignStudentsToGroup = (groupStudents: any[], s: any) => {
    this.resources.assignStudentsToGroup(groupStudents,
      (response: any) => {
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  unAssignStudentsFromGroup = (groupStudents: any[], s: any) => {
    this.resources.unAssignStudentsFromGroup(groupStudents,
      (response: any) => {
        s(response);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }
}
