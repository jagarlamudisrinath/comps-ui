import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor() { }

  static cloneObject = (dataObject: any): any => {
    const newObj: any = (dataObject instanceof Array) ? [] : {};
    for (const i in dataObject) {
      if (i === 'clone') { continue; }
      if (dataObject[i] && typeof dataObject[i] === 'object') {
        // Filtering case for Date whose type is 'object'
        if (Object.prototype.toString.call(dataObject[i]) === '[object Date]') {
          newObj[i] = dataObject[i];
        } else {
          newObj[i] = CommonUtilsService.cloneObject(dataObject[i]);
        }
      } else {
        newObj[i] = dataObject[i];
      }
    }
    return newObj;
  }

  static isEmpty = (value: any) => {
    let flag = false;
    if (value === null || value === undefined) {
      flag = true;
    } else {
      if (value instanceof Object) {
        if (value instanceof Date) {
          if (!value) {
            flag = true;
          }
        } else if (Object.keys(value).length === 0) {
          flag = true;
        }
      } else if (value instanceof Array && value.length === 0) {
        flag = true;
      } else if (typeof value === 'string' && value.trim() === "") {
        flag = true;
      }
    }
    return flag;
  }
}
