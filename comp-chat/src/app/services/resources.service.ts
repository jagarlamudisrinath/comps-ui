import { Injectable } from '@angular/core';
import { CommunicationsService } from './communications.service';
import { Class } from '../models/class';
import { Assignment } from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private comm: CommunicationsService) { }

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
}
