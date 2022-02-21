import { Component, OnInit } from '@angular/core';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(public rootScope: RootScopeService) { }

  ngOnInit(): void {

  }

}
