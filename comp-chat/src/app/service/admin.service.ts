import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../enums/user-type';
import { Assignment } from '../models/assignment';
import { Class } from '../models/class';
import { User } from '../models/user';
import { CommonUtilsService } from '../services/common-utils.service';
import { ResourcesService } from '../services/resources.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  classes: BehaviorSubject<Class[]> = new BehaviorSubject<Class[]>([]);
  professors: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  graduateAssistants: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  classAssignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);

  constructor(private resources: ResourcesService) { }

  getClasses = () => {
    this.classes.next([
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
      { id: "a", title: "Assignment A", noOfGroups: 3, classId: '1', question: 'Question 1' },
      { id: "b", title: "Assignment B", noOfGroups: 5, classId: '1', question: 'Question 1' },
      { id: "c", title: "Assignment C", noOfGroups: 2, classId: '1', question: 'Question 1' }
    ]);
    /* this.resources.getClassAssignments(classId,
      (response: Assignment[]) => {
        this.classAssignments.next(response);
      }, (response: any) => {
        this.classAssignments.next([]);
        f(response);
      }); */
  }

  createOrUpdateAssignment = (classId: string, cl: Assignment, s: any, f: any) => {
    this.resources.createOrUpdateAssignment(classId, cl,
      (response: Assignment) => {
        s(response);
        this.getClassAssignments(classId, f);
      }, (response: any) => {
        f(response);
      });
  }
}
