import { Component } from '@angular/core';
import { RootScopeService } from './services/root-scope.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comp-chat';

  constructor(public rootScope: RootScopeService) { }
}
