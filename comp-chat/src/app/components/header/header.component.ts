import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isOpen: boolean = false;
  loggedInUser: User = new User();
  constructor(public rootScope: RootScopeService, private commonUtils: CommonUtilsService) { }

  ngOnInit(): void {
    let isUserLoggedIn = localStorage.getItem('IS_USER_LOGGED_IN') === null ? false : Boolean(localStorage.getItem('IS_USER_LOGGED_IN'));
    this.rootScope.IS_USER_LOGGED_IN.next(isUserLoggedIn);
    let localUser = localStorage.getItem('LOGGED_IN_USER');
    let user = localUser ? JSON.parse(localUser) : new User();
    this.rootScope.LOGGED_IN_USER.next(user);
    this.loggedInUser = user;
  }

  logout = () => {
    window.location.href = '/login';
    localStorage.clear();
  }

}
