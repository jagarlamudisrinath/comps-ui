import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../enums/user-type';
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

  constructor(private resources: ResourcesService) { }

  getClasses = () => {
    this.classes.next([
      { id: "a", title: "Class A", description: '', profId: "1", gaId: '1' },
      { id: "b", title: "Class B", description: '', profId: "2", gaId: '2' },
      { id: "c", title: "Class C", description: '', profId: "3", gaId: '3' }
    ]);
    /* this.resources.getClasses(userId,
      (response: Class[]) => {
        this.classes.next(response);
      }, (response: any) => {
        this.classes.next([]);
        f(response);
      }); */
  }

  createOrUpdateClass = (cl: Class, s: any, f: any) => {
    /* if (CommonUtilsService.isEmpty(cl.id)) {
      this.resources.createClass(cl,
        (response: Class) => {
          s(response);
        }, (response: any) => {
          f(response);
        });
    } else {

    } */
  }

  deleteClass = (cl: Class, f: any) => {

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
}
