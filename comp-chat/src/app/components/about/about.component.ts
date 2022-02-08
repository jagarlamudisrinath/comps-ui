import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  user: User = new User();
  constructor() { }

  ngOnInit(): void {
    this.user.name = "Test Admin";
    this.user.email = "test_email@email.com";
  }

}
