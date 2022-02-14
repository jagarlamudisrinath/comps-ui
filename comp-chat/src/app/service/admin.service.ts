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

  constructor(private resources: ResourcesService) { }

  getUsers = (f: any) => {
    this.users.next([
      { id: '1', firstName: 'Test', lastName: 'User A', email: 'user_a@gmail.com', type: UserType.ADMIN },
      { id: '2', firstName: 'Test', lastName: 'User B', email: 'user_b@gmail.com', type: UserType.PROFESSOR },
      { id: '3', firstName: 'Test', lastName: 'User C', email: 'user_c@gmail.com', type: UserType.PROFESSOR },
      { id: '4', firstName: 'Test', lastName: 'User D', email: 'user_d@gmail.com', type: UserType.GA },
      { id: '5', firstName: 'Test', lastName: 'User E', email: 'user_e@gmail.com', type: UserType.GA },
      { id: '1', firstName: 'Test', lastName: 'User A', email: 'user_a@gmail.com', type: UserType.ADMIN },
      { id: '2', firstName: 'Test', lastName: 'User B', email: 'user_b@gmail.com', type: UserType.PROFESSOR },
      { id: '3', firstName: 'Test', lastName: 'User C', email: 'user_c@gmail.com', type: UserType.PROFESSOR },
      { id: '4', firstName: 'Test', lastName: 'User D', email: 'user_d@gmail.com', type: UserType.GA },
      { id: '5', firstName: 'Test', lastName: 'User E', email: 'user_e@gmail.com', type: UserType.GA },
      { id: '6', firstName: 'Test', lastName: 'User F', email: 'user_f@gmail.com', type: UserType.PROFESSOR }
    ]);
    /* this.resources.getUsers(
      (response: User[]) => {
        this.users.next(response);
      }, (response: any) => {
        this.users.next([]);
        f(response);
      }); */
  }

  uploadUsers = (formData: any, s: any, f: any) => {
    this.resources.uploadUsers(formData,
      (response: any) => {
        this.getUsers(f);
        s(response);
      }, (response: any) => {
        f(response);
      });
  }

  getClasses = () => {
    this.classes.next([
      { id: "a", title: "Class A", description: '', profId: "1", gaId: '1' },
      { id: "b", title: "Class B", description: '', profId: "2", gaId: '2' },
      { id: "a", title: "Class A", description: '', profId: "1", gaId: '1' },
      { id: "b", title: "Class B", description: '', profId: "2", gaId: '2' },
      { id: "a", title: "Class A", description: '', profId: "1", gaId: '1' },
      { id: "b", title: "Class B", description: '', profId: "2", gaId: '2' },
      { id: "a", title: "Class A", description: '', profId: "1", gaId: '1' },
      { id: "b", title: "Class B", description: '', profId: "2", gaId: '2' },
      { id: "c", title: "Class C", description: '', profId: "3", gaId: '3' }
    ]);
    /* this.resources.getClasses(
      (response: Class[]) => {
        this.classes.next(response);
      }, (response: any) => {
        this.classes.next([]);
        f(response);
      }); */
  }

  createOrUpdateClass = (cl: Class, s: any, f: any) => {
    this.resources.createOrUpdateClass(cl,
      (response: Class) => {
        s(response);
        this.getClasses();
      }, (response: any) => {
        f(response);
      });
  }

  getProfessors = () => {
    this.professors.next([
      { id: '1', firstName: 'User', lastName: 'A', email: 'user_a@gmail.com', type: UserType.PROFESSOR },
      { id: '2', firstName: 'User', lastName: 'B', email: 'user_b@gmail.com', type: UserType.PROFESSOR },
      { id: '3', firstName: 'User', lastName: 'C', email: 'user_c@gmail.com', type: UserType.PROFESSOR },
      { id: '4', firstName: 'User', lastName: 'D', email: 'user_d@gmail.com', type: UserType.PROFESSOR },
      { id: '5', firstName: 'User', lastName: 'E', email: 'user_e@gmail.com', type: UserType.PROFESSOR },
      { id: '6', firstName: 'User', lastName: 'F', email: 'user_f@gmail.com', type: UserType.PROFESSOR }
    ]);
    /* this.resources.getProfessors(
      (response: User[]) => {
        this.professors.next(response);
      }, (response: any) => {
        this.professors.next([]);
        f(response);
      }); */
  }

  getGraduateAssistants = () => {
    this.graduateAssistants.next([
      { id: '1', firstName: 'User', lastName: 'A', email: 'user_a@gmail.com', type: UserType.GA },
      { id: '2', firstName: 'User', lastName: 'B', email: 'user_b@gmail.com', type: UserType.GA },
      { id: '3', firstName: 'User', lastName: 'C', email: 'user_c@gmail.com', type: UserType.GA },
      { id: '4', firstName: 'User', lastName: 'D', email: 'user_d@gmail.com', type: UserType.GA },
      { id: '5', firstName: 'User', lastName: 'E', email: 'user_e@gmail.com', type: UserType.GA },
      { id: '6', firstName: 'User', lastName: 'F', email: 'user_f@gmail.com', type: UserType.GA }
    ]);
    /* this.resources.getGraduateAssistants(
      (response: User[]) => {
        this.graduateAssistants.next(response);
      }, (response: any) => {
        this.graduateAssistants.next([]);
        f(response);
      }); */
  }

  uploadStudentsToClass = (classId: string, formData: any, s: any, f: any) => {
    this.resources.uploadStudentsToClass(classId, formData,
      (response: any) => {
        s(response);
      }, (response: any) => {
        f(response);
      });
  }

  getClassAssignments = (classId: string, f: any) => {
    this.classAssignments.next([
      { id: "a", title: "Assignment A", noOfGroups: 3, classId: '1', description: 'Question 1' },
      { id: "b", title: "Assignment B", noOfGroups: 5, classId: '1', description: 'Question 1' },
      { id: "c", title: "Assignment C", noOfGroups: 2, classId: '1', description: 'Question 1' }
    ]);
    /* this.resources.getClassAssignments(classId,
      (response: Assignment[]) => {
        this.classAssignments.next(response);
      }, (response: any) => {
        this.classAssignments.next([]);
        f(response);
      }); */
  }

  createOrUpdateAssignment = (cl: Assignment, file: any, s: any, f: any) => {
    this.resources.createOrUpdateAssignment(cl, file,
      (response: Assignment) => {
        s(response);
        this.getClassAssignments(cl.classId, f);
      }, (response: any) => {
        f(response);
      });
  }

  getAssignmentGroups = (assignmentId: string, f: any) => {
    this.assignmentGroups.next([
      { id: "a", title: "Group A", groupId: '1', assignmentId: "1", answer: '' },
      { id: "b", title: "Group B", groupId: '2', assignmentId: "1", answer: '' },
      { id: "c", title: "Group c", groupId: '3', assignmentId: "1", answer: '' },
    ]);
    /* this.resources.getAssignmentGroups(assignmentId,
      (response: Group[]) => {
        this.assignmentGroups.next(response);
      }, (response: any) => {
        this.assignmentGroups.next([]);
        f(response);
      }); */
  }

  createOrUpdateGroup = (classId: string, assignmentId: string, group: Group, s: any, f: any) => {
    this.resources.createOrUpdateGroup(classId, assignmentId, group,
      (response: Group) => {
        s(response);
        this.getAssignmentGroups(assignmentId, f);
      }, (response: any) => {
        f(response);
      });
  }

  getGroupStudents = (groupId: string, f: any) => {
    this.groupStudents.next([
      { id: '1', firstName: 'User', lastName: 'A', email: 'user_a@gmail.com', type: UserType.GA },
      { id: '11', firstName: 'User', lastName: 'K', email: 'user_c@gmail.com', type: UserType.GA },
      { id: '4', firstName: 'User', lastName: 'D', email: 'user_d@gmail.com', type: UserType.GA },
      { id: '6', firstName: 'User', lastName: 'F', email: 'user_f@gmail.com', type: UserType.GA }
    ]);
    /* this.resources.getGroupStudents(groupId,
      (response: User[]) => {
        this.groupStudents.next(response);
      }, (response: any) => {
        this.groupStudents.next([]);
        f(response);
      }); */
  }

  getClassStudents = (classId: string, f: any) => {
    this.classStudents.next([
      { id: '2', firstName: 'User', lastName: 'B', email: 'user_b@gmail.com', type: UserType.GA },
      { id: '3', firstName: 'User', lastName: 'C', email: 'user_c@gmail.com', type: UserType.GA },
      { id: '5', firstName: 'User', lastName: 'E', email: 'user_e@gmail.com', type: UserType.GA },
      { id: '7', firstName: 'User', lastName: 'G', email: 'user_g@gmail.com', type: UserType.GA },
      { id: '8', firstName: 'User', lastName: 'H', email: 'user_h@gmail.com', type: UserType.GA },
      { id: '9', firstName: 'User', lastName: 'I', email: 'user_i@gmail.com', type: UserType.GA },
      { id: '10', firstName: 'User', lastName: 'J', email: 'user_j@gmail.com', type: UserType.GA }
    ]);
    /* this.resources.getClassStudents(classId,
      (response: User[]) => {
        this.classStudents.next(response);
      }, (response: any) => {
        this.classStudents.next([]);
        f(response);
      }); */
  }

  assignStudentsToGroup = (groupId: string, users: User[], s: any, f: any) => {
    this.resources.assignStudentsToGroup(groupId, users,
      (response: any) => {

      }, (response: any) => {

        f(response);
      });
  }

  unAssignStudentsFromGroup = (groupId: string, users: User[], s: any, f: any) => {
    this.resources.unAssignStudentsFromGroup(groupId, users,
      (response: any) => {

      }, (response: any) => {

        f(response);
      });
  }
}
