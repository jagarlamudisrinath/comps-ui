import { Injectable } from '@angular/core';
import { CommunicationsService } from './communications.service';
import { Class } from '../models/class';
import { Assignment } from '../models/assignment';
import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private comm: CommunicationsService) { }

  getUsers = (s: any, f: any) => {
    const slug: string = "/users";
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  uploadUsers = (formData: any, s: any, f: any) => {
    const slug = "/users/upload";
    this.comm.post(formData,
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

  getProfessors = (s: any, f: any) => {
    const slug: string = "/users";
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  getGraduateAssistants = (s: any, f: any) => {
    const slug: string = "/users";
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  uploadStudentsToClass = (classId: string, formData: any, s: any, f: any) => {
    const slug = "/class-students/upload?classId=" + classId;
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

  createOrUpdateAssignment = (classId: string, cl: Assignment, s: any, f: any) => {
    const slug = "/assignments?classId=" + classId;
    this.comm.post(slug, cl,
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
    const slug: string = "/users?groupId=" + groupId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  getClassStudents = (classId: string, s: any, f: any) => {
    const slug: string = "/users?classId=" + classId;
    this.comm.get(slug,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null, null);
  }

  assignStudentsToGroup = (groupId: string, users: User[], s: any, f: any) => {
    const slug = "/groups/" + groupId + "/assignStudents";
    this.comm.post(slug, users,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }

  unAssignStudentsFromGroup = (groupId: string, users: User[], s: any, f: any) => {
    const slug = "/groups/" + groupId + "/unassignStudents";
    this.comm.post(slug, users,
      (res: any) => {
        s(res);
      }, (res: any) => {
        f(res);
      }, null);
  }
}
