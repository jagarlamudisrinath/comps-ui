import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RootScopeService {
  APP_ROOT_URL = environment.app_root_url;

  IS_USER_LOGGED_IN: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  LOGGED_IN_USER: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  REQUEST_LOADING: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  REQUEST_COUNT: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  /*
   * Spinner related function,
   * It will count all the backend requests and it will remove completed requests
   * When the requests count is 0 then only macre spinner will close,
   * Other wise it will spin until all the requests are closed.
   */
  updateRequestsCount = (flag: string) => {
    let count = this.REQUEST_COUNT.value;
    if (flag === "ADD") {
      count = count + 1
    } else if (flag === "REMOVE") {
      count = count - 1;
    }
    if (count > 0) {
      this.REQUEST_COUNT.next(count);
      this.REQUEST_LOADING.next(true);
    } else {
      this.REQUEST_COUNT.next(0);
      this.REQUEST_LOADING.next(false);
    }
  }

}
