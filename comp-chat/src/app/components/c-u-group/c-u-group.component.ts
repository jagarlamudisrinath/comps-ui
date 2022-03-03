import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-c-u-group',
  templateUrl: './c-u-group.component.html',
  styleUrls: ['./c-u-group.component.scss']
})
export class CUGroupComponent implements OnInit {
  @Input() user: User = new User();
  @Input() isNew: boolean = true;
  @Input() originalGroup: Group = new Group();
  @Input() selectedGroup: Group = new Group();
  @Input() classId: string = '';
  @Input() assignmentId: string = '';
  @Input() drawer: any;
  @Output() slide: any = new EventEmitter();

  constructor(private adminService: AdminService, private commonUtils: CommonUtilsService) { }
  ngOnInit(): void {
  }

  save = () => {
    this.adminService.createOrUpdateGroup(this.classId, this.assignmentId, this.selectedGroup,
      (response: Group) => {
        let msg = `Group [ ${response.title} ] created successfully.`;
        if (!this.isNew) {
          msg = `Group [ ${response.title} ] updated successfully.`;
        }
        this.commonUtils.openSnackBar(msg);
        Object.assign(this.originalGroup, response);
        Object.assign(this.selectedGroup, response);
        this.slide.emit(this.drawer);
      });

  }

}
