import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from 'src/app/models/assignment';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

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

  constructor(private adminService: AdminService, private commonUtils: CommonUtilsService) { }

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
    let file = this.isNew ? this.files[0] : '';
    let formData = new FormData();
    for (const [key, value] of Object.entries(this.selectedAssignment)) {
      formData.append(key, value);
    }
    formData.append('file', file);

    this.adminService.createOrUpdateAssignment(this.selectedAssignment, formData,
      (response: any) => {
        let msg = `Assignment [ ${this.selectedAssignment.title} ] created successfully.`;
        if (!this.isNew) {
          msg = `Assignment [ ${this.selectedAssignment.title} ] updated successfully.`;
        }
        this.commonUtils.openSnackBar(msg);
        Object.assign(this.originalAssignment, this.selectedAssignment);
        this.slide.emit(this.drawer);
      });
  }

}
