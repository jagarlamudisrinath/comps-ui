import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/models/group';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-c-u-group',
  templateUrl: './c-u-group.component.html',
  styleUrls: ['./c-u-group.component.scss']
})
export class CUGroupComponent implements OnInit {

  @Input() isNew: boolean = true;
  @Input() originalGroup: Group = new Group();
  @Input() selectedGroup: Group = new Group();
  @Input() classId: string = '';
  @Input() assignmentId: string = '';
  @Input() drawer: any;
  @Output() slide: any = new EventEmitter();

  constructor(private adminService: AdminService) { }
  ngOnInit(): void {
  }

  save = () => {
    this.adminService.createOrUpdateGroup(this.classId, this.assignmentId, this.selectedGroup,
      (response: Group) => {
        if (this.isNew) {
          alert(`Group [ ${response.title} ] created successfully.`);
        } else {
          alert(`Group [ ${response.title} ] updated successfully.`);
        }
        Object.assign(this.originalGroup, response);
        Object.assign(this.selectedGroup, response);
        this.slide.emit(this.drawer);
      }, (response: any) => {
        alert('Error in Group.')
      }
    );

  }

}
