import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Class } from 'src/app/models/class';
import { Assignment } from 'src/app/models/assignment';
import { Group } from 'src/app/models/group';
import { RootScopeService } from 'src/app/services/root-scope.service';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() class: Class = new Class();
  @Input() assignment: Assignment = new Assignment();
  @Input() group: Group = new Group();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  groupStudents: User[] = [];

  constructor(private rootScope: RootScopeService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.groupStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groupStudents = result;
      });

    this.getGroupStudents();
  }

  getGroupStudents = () => {
    this.adminService.getGroupStudents(this.group.id);
  }

  downloadAssignmentFile = () => {
    let url = this.rootScope.APP_ROOT_URL + 'assignments/' + this.assignment.id + '/fileDownload';
    window.location.href = url;
  }
}
