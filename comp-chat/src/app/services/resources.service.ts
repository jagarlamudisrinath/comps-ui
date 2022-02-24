import { Injectable } from '@angular/core';
import { CommunicationsService } from './communications.service';
import { Class } from '../models/class';
import { Assignment } from '../models/assignment';
import { User } from '../models/user';
import { Group } from '../models/group';
import { UserType } from '../enums/user-type';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private comm: CommunicationsService) { }

  login = (credentials: any, s: any, f: any) => {
    const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } }
    const slug = '/login';
    this.comm.post(slug, credentials,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, headers);
  }

  getUsers = (s: any, f: any) => {
    const slug: string = "/users/all";
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  uploadUsers = (formData: any, s: any, f: any) => {
    const slug = "/users/upload";
    this.comm.post(slug, formData,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  getClasses = (s: any, f: any) => {
    const slug: string = "/classes";
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  createOrUpdateClass = (cl: Class, s: any, f: any) => {
    const slug = "/classes";
    this.comm.post(slug, cl,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  getUsersByType = (type: UserType, s: any, f: any) => {
    const slug: string = "/users?type=" + type;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  getClassStudents = (classId: string, s: any, f: any) => {
    const slug = "/class-students?classId=" + classId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  uploadStudentsToClass = (classId: string, formData: any, s: any, f: any) => {
    const slug = "/class-students/" + classId;
    this.comm.post(slug, formData,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  getClassAssignments = (classId: string, s: any, f: any) => {
    const slug: string = "/assignments?classId=" + classId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  createOrUpdateAssignment = (cl: Assignment, formData: any, s: any, f: any) => {
    const slug = "/assignments";
    this.comm.post(slug, formData,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  getAssignmentGroups = (assignmentId: string, s: any, f: any) => {
    const slug: string = "/groups?assignmentId=" + assignmentId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  createOrUpdateGroup = (classId: string, assignmentId: string, group: Group, s: any, f: any) => {
    const slug = "/groups";
    this.comm.post(slug, group,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  getGroupStudents = (groupId: string, s: any, f: any) => {
    const slug: string = "/group-students?groupId=" + groupId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  /* Get class students who are not in any group in the class */
  getClassStudentsNotInAnyGroup = (classId: string, assignmentId: string, s: any, f: any) => {
    const slug: string = "/group-students?classId=" + classId + "&assignmentId=" + assignmentId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  assignStudentsToGroup = (groupStudents: any[], s: any, f: any) => {
    const slug = "/group-students";
    this.comm.post(slug, groupStudents,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  unAssignStudentsFromGroup = (groupStudents: any[], s: any, f: any) => {
    const slug = "/group-students";
    this.comm.delete(slug, groupStudents,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      });
  }

  getChatHistory = (groupId: string, sizePerPage: number, pageNo: number, s: any, f: any) => {
    const slug: string = "/messages/" + groupId + "?page=" + pageNo + "&size=" + sizePerPage;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }
}
