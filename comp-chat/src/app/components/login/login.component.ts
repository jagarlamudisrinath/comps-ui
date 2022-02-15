import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/enums/user-type';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    username: '',
    password: ''
  }

  constructor(private resources: ResourcesService) { }

  ngOnInit(): void {
  }

  login = () => {
    this.resources.login(this.user,
      (response: any) => {
        alert('Login successful.')
      }, (response: any) => {
        alert('Login not successful.')
      });
  }
}
