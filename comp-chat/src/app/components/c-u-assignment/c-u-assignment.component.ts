import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/models/assignment';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-c-u-assignment',
  templateUrl: './c-u-assignment.component.html',
  styleUrls: ['./c-u-assignment.component.scss']
})
export class CUAssignmentComponent implements OnInit {
  @Input() isNew: boolean = true;
  @Input() originalAssignment: Assignment = new Assignment();
  @Input() selectedAssignment: Assignment = new Assignment();
  @Input() classId: string = '';
  @Input() drawer: any;
  @Output() slide: any = new EventEmitter();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  save = () => {
    this.adminService.createOrUpdateAssignment(this.classId, this.selectedAssignment,
      (response: Assignment) => {
        if (this.isNew) {
          alert(`Assignment [ ${response.title} ] created successfully.`);
        } else {
          alert(`Assignment [ ${response.title} ] updated successfully.`);
        }
        Object.assign(this.originalAssignment, response);
        Object.assign(this.selectedAssignment, response);
        this.slide.emit(this.drawer);
      }, (response: any) => {
        alert('Error in Assignment.')
      }
    );

  }

}
