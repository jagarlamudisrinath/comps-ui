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

  files: File[] = [];
  filesErrorMessage: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onSelect = (event: any) => {
    this.filesErrorMessage = '';
    if (this.files.length === 1) {
      this.filesErrorMessage = `Only 1 file can be uploaded.`;
    } else {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  save = () => {
    let file = this.isNew ? this.files[0] : null;
    this.adminService.createOrUpdateAssignment(this.selectedAssignment, file,
      (response: Assignment) => {
        let msg = `Assignment [ ${response.title} ] created successfully.`;
        if (!this.isNew) {
          msg = `Assignment [ ${response.title} ] updated successfully.`;
        }
        Object.assign(this.originalAssignment, response);
        Object.assign(this.selectedAssignment, response);
        this.slide.emit(this.drawer);
      });
  }

}
