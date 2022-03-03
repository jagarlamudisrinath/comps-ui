import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Class } from 'src/app/models/class';
import { Assignment } from 'src/app/models/assignment';
import { Group } from 'src/app/models/group';
import { RootScopeService } from 'src/app/services/root-scope.service';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { ChatMessage } from 'src/app/model/chat-message';
import { CommonUtilsService } from 'src/app/services/common-utils.service';
declare var $: any;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() loggedInUser: User = new User();
  @Input() class: Class = new Class();
  @Input() assignment: Assignment = new Assignment();
  @Input() professor: User = new User();
  @Input() group: Group = new Group();
  @Input() drawer: any;
  @Output() slideParent: any = new EventEmitter();

  chatMessages: any[] = [];
  lastCount: number = 0;
  isDuplicateCall: boolean = false;
  groupStudents: any[] = [];
  chatMessage: ChatMessage = new ChatMessage();
  sizePerPage: number = 50;
  pageNo: number = 0;

  constructor(
    private rootScope: RootScopeService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatMessage.chatId = this.group.id;
    this.chatMessage.sender = this.loggedInUser.id;

    this.chatService.groupStudents.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.groupStudents = result;
        if (!CommonUtilsService.isEmpty(this.groupStudents)) {
          this.getChatHistory();
        }
      });

    this.chatService.messages.pipe(
      takeUntil(this.destroy$))
      .subscribe(result => {
        this.chatMessages = result;
      });

    this.getGroupStudents();
    this.chatService.connect(this.group.id);
  }

  getChatHistory = () => {
    this.chatService.getChatHistory(this.group.id, this.sizePerPage, this.pageNo,
      (count: number) => {
        this.isDuplicateCall = false;
        this.lastCount = count;
        if (count === this.sizePerPage) {
          this.pageNo++;
        }
      });
  }

  getGroupStudents = () => {
    this.chatService.getGroupStudents(this.group.id, this.professor);
  }

  downloadAssignmentFile = () => {
    let url = this.rootScope.APP_ROOT_URL + '/assignments/' + this.assignment.id + '/file';
    window.location.href = url;
  }

  sendMessage = () => {
    this.chatMessage.content = this.chatMessage.content.trim();
    if (!CommonUtilsService.isEmpty(this.chatMessage.content)) {
      this.chatService.sendMessage(this.chatMessage);
      this.chatMessage.content = '';
    }
  }

  onScroll = (event: any) => {
    if ($(event.target).scrollTop() <= 0 && this.chatMessages.length > 10 &&
      this.lastCount === this.sizePerPage && !this.isDuplicateCall) {
      this.isDuplicateCall = true;
      this.getChatHistory();
    }
  }

  ngOnDestroy(): void {
    this.pageNo = 0;
    this.chatService.disconnect(this.group.id);
    this.chatService.groupStudents.next([]);
    this.chatService.messages.next([]);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
