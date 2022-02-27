import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { ResourcesService } from 'src/app/services/resources.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  isOpen: boolean = false;
  loggedInUser: User = new User();
  constructor(public rootScope: RootScopeService, private resources: ResourcesService) { }

  ngOnInit(): void {
    let isUserLoggedIn = localStorage.getItem('IS_USER_LOGGED_IN') === null ? false : Boolean(localStorage.getItem('IS_USER_LOGGED_IN'));
    this.rootScope.IS_USER_LOGGED_IN.next(isUserLoggedIn);
    if (isUserLoggedIn) {
      let localUser = localStorage.getItem('LOGGED_IN_USER');
      let user = localUser ? JSON.parse(localUser) : new User();
      this.rootScope.LOGGED_IN_USER.next(user);
      this.loggedInUser = user;
    } else {
      this.logout();
    }

    this.rootScope.LOGGED_IN_USER.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.loggedInUser = result;
      });

  }

  logout = () => {
    localStorage.clear();
    //this.resources.logout();
    if (window.location.href.indexOf('login') === -1) {
      window.location.href = '/login';
    }
  }

}
