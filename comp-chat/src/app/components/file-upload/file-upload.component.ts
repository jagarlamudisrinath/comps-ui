import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() componentId: string = '';
  @Input() componentName: string = '';
  @Input() drawer: any;
  @Input() multiple: any = true;
  @Input() acceptedFileTypes: string = '*';
  @Input() filesCount: number = 1;
  @Output() slide: any = new EventEmitter();

  files: File[] = [];
  filesErrorMessage: string = '';

  constructor(private adminService: AdminService, private commonUtils: CommonUtilsService) { }

  ngOnInit(): void {
  }

  onSelect = (event: any) => {
    this.filesErrorMessage = '';
    if (this.files.length === this.filesCount) {
      this.filesErrorMessage = `Only ${this.filesCount} file(s) can be uploaded.`;
    } else {
      this.files.push(...event.addedFiles);
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload = () => {
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file' + i, this.files[i]);
    }

    switch (this.type) {
      case 'UPLOAD_CLASS_STUDENTS':
        this.adminService.uploadStudentsToClass(this.componentId, formData,
          (response: any) => {
            this.slide.emit(this.drawer);
            this.commonUtils.openSnackBar(`Students uploaded successfully to class [ ${this.componentName} ].`)
          });
        break;
      case 'UPLOAD_USERS':
        this.adminService.uploadUsers(formData,
          (response: any) => {
            this.slide.emit(this.drawer);
            this.commonUtils.openSnackBar('Users uploaded successfully.');
          });
        break;
    }
  }

}
