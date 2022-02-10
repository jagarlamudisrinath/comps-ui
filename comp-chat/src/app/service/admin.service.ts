import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../enums/user-type';
import { Class } from '../models/class';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  classes: BehaviorSubject<Class[]> = new BehaviorSubject<Class[]>([]);
  professors: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  graduateAssistants: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor() { }

  getClasses = () => {
    this.classes.next([
      { id: "a", title: "Class A", profId: "1", gaId: '1' },
      { id: "b", title: "Class B", profId: "2", gaId: '2' },
      { id: "c", title: "Class C", profId: "3", gaId: '3' }
    ])
  }

  createOrUpdateClass = (cl: Class, s: any, f: any) => {

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
    ])
  }

  getGraduateAssistants = () => {
    this.graduateAssistants.next([
      { id: '1', firstName: 'User', lastName: 'A', email: 'user_a@gmail.com', type: UserType.GA },
      { id: '2', firstName: 'User', lastName: 'B', email: 'user_b@gmail.com', type: UserType.GA },
      { id: '3', firstName: 'User', lastName: 'C', email: 'user_c@gmail.com', type: UserType.GA },
      { id: '4', firstName: 'User', lastName: 'D', email: 'user_d@gmail.com', type: UserType.GA },
      { id: '5', firstName: 'User', lastName: 'E', email: 'user_e@gmail.com', type: UserType.GA },
      { id: '6', firstName: 'User', lastName: 'F', email: 'user_f@gmail.com', type: UserType.GA }
    ])
  }
}
