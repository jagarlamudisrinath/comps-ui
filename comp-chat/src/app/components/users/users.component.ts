import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserType } from 'src/app/enums/user-type';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  filterString: string = '';
  showTemplate: boolean = true;
  showSlideTemplate: string = "USERS";
  users: User[] = [];

  constructor(
    private rootScope: RootScopeService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.rootScope.LOGGED_IN_USER.value.type !== UserType.ADMIN) {
      this.router.navigate(['/home']);
    } else {
      this.adminService.users.pipe(
        takeUntil(this.destroy$))
        .subscribe(result => {
          this.users = result;
        });

      this.getUsers();
    }
  }

  getUsers = () => {
    this.adminService.getUsers();
  }

  applyFilter(event: any) {
    this.filterString = event.target.value;
  }

  add = (drawer: any) => {
    this.showSlideTemplate = "IMPORT_USER";
    this.slide(drawer);
  }

  slide = (drawer: any) => {
    if (drawer._opened) {
      this.showTemplate = true;
    } else {
      this.showTemplate = false;
    }
    drawer.toggle();
  }

  ngOnDestroy() {
    this.adminService.users.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
