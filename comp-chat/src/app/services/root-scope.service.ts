import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RootScopeService {

  LOGGED_IN_USER: BehaviorSubject<User> = new BehaviorSubject(new User());

  constructor() { }

}
