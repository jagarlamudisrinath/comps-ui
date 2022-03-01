import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootScopeService } from './services/root-scope.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  title = 'comp-chat';
  isLoggedIn: boolean = false;
  constructor(public rootScope: RootScopeService) { }

  ngOnInit() {
    this.rootScope.IS_USER_LOGGED_IN.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.isLoggedIn = result;
      });

    this.isLoggedIn = localStorage.getItem('IS_USER_LOGGED_IN') === null ? false : Boolean(localStorage.getItem('IS_USER_LOGGED_IN'));
  }
}
