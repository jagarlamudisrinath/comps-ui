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
    this.rootScope.IS_USER_LOGGED_IN.next(Boolean(localStorage.getItem('IS_USER_LOGGED_IN')));
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
