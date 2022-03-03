import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootScopeService } from '../services/root-scope.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  requestLoading: boolean = false;

  constructor(
    private rootScope: RootScopeService
  ) { }

  ngOnInit() {
    this.rootScope.REQUEST_LOADING.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        setTimeout(() => {
          this.requestLoading = result;
        }, 100);
      });
  }
}
