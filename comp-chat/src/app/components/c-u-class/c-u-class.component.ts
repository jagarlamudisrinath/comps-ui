import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Class } from 'src/app/models/class';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/service/admin.service';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
import { RootScopeService } from 'src/app/services/root-scope.service';

@Component({
  selector: 'app-c-u-class',
  templateUrl: './c-u-class.component.html',
  styleUrls: ['./c-u-class.component.scss']
})
export class CUClassComponent implements OnInit {

  @Input() isNew: boolean = true;
  @Input() originalClass: Class = new Class();
  @Input() selectedClass: Class = new Class();
  @Input() professors: User[] = [];
  @Input() graduateAssistants: User[] = [];
  @Input() drawer: any;
  @Output() slide: any = new EventEmitter();

  profSearchString: string = "";
  filteredProfessors: User[] = [];
  gaSearchString: string = "";
  filteredGAs: User[] = [];
  loggedInUser: User = new User();

  constructor(
    private adminService: AdminService,
    private commonUtils: CommonUtilsService,
    private rootScope: RootScopeService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.rootScope.LOGGED_IN_USER.value;
    this.filteredProfessors = this.getFilteredItems('', this.professors);
    this.filteredGAs = this.getFilteredItems('', this.graduateAssistants);
  }

  getFilteredProfessors = (event: any) => {
    this.filteredProfessors = this.getFilteredItems(event.target.value, this.professors);
  }

  getFilteredGAs = (event: any) => {
    this.filteredGAs = this.getFilteredItems(event.target.value, this.graduateAssistants);
  }

  getFilteredItems = (name: string, items: User[]) => {
    var filteredItems = [];
    if (name) {
      filteredItems = items.filter(
        (item: any) => item.firstName.toLowerCase().indexOf(name.toLowerCase()) > -1 || item.lastName.toLowerCase().indexOf(name.toLowerCase()) > -1
      )
    } else {
      filteredItems = items;
    }
    return filteredItems;
  }

  save = () => {
    this.adminService.createOrUpdateClass(this.selectedClass,
      (response: Class) => {
        let msg = `Class [ ${response.title} ] created successfully.`;
        if (!this.isNew) {
          msg = `Class [ ${response.title} ] updated successfully.`;
        }
        this.commonUtils.openSnackBar(msg);
        Object.assign(this.originalClass, response);
        Object.assign(this.selectedClass, response);
        this.slide.emit(this.drawer);
      });
  }

}
