import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/enums/user-type';
import { User } from 'src/app/models/user';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    type: UserType.ADMIN,
    username: '',
    password: ''
  }

  constructor(
    private resources: ResourcesService,
    private router: Router,
    private rootScope: RootScopeService,
    private commonUtils: CommonUtilsService
  ) { }

  ngOnInit(): void {

  }

  login = () => {
    let formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    this.resources.login(formData,
      (response: any) => {
        this.rootScope.LOGGED_IN_USER.next(response.user);
        localStorage.setItem('LOGGED_IN_USER', JSON.stringify(response.user));
        this.rootScope.IS_USER_LOGGED_IN.next(true);
        localStorage.setItem('IS_USER_LOGGED_IN', 'true');
        this.commonUtils.openSnackBar('Login successful.');
        let url = '';
        switch (this.user.type) {
          case UserType.ADMIN:
            url = '/admin'
            break;
          case UserType.STUDENT:
            url = '/student'
            break;
          case UserType.PROFESSOR:
            url = '/admin'
            break;
          case UserType.GA:
            url = '/admin'
            break;
        }
        this.router.navigate([url]);
      }, (response: any) => {
        this.commonUtils.openSnackBar('Login failed.');
      });
  }
}
