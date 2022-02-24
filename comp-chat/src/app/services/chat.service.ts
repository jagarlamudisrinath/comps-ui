import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserType } from '../enums/user-type';
import { ChatMessage } from '../model/chat-message';
import { User } from '../models/user';
import { CommonUtilsService } from './common-utils.service';
import { ResourcesService } from './resources.service';
import { RootScopeService } from './root-scope.service';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  stompClient: any;
  groupStudents: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  messages: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  groupId: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private rootScope: RootScopeService, private resources: ResourcesService, private commonUtils: CommonUtilsService) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = this.rootScope.APP_ROOT_URL + "/ws/";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({ groupId: "e2832c22-6bd4-47a3-8ca4-49945a0173eb-group1" }, function (frame: any) {
      that.stompClient.subscribe('/topic/' + that.groupId.value, (message: any) => {
        if (message.body) {
          let user = that.prepareName(that.rootScope.LOGGED_IN_USER.value);
          let msg = JSON.parse(message.body);
          msg.userName = user.userName;
          msg.shortName = user.shortName;
          that.messages.value.push(msg);
        }
      });
    });

  }

  disconnect = () => {
    this.stompClient.disconnect({ groupId: "e2832c22-6bd4-47a3-8ca4-49945a0173eb-group1" });
  }


  sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
  }

  getGroupStudents = (groupId: string) => {
    this.resources.getGroupStudents(groupId,
      (response: any[]) => {
        let users: any[] = this.prepareUsers(response);
        this.groupStudents.next(users);
      }, (response: any) => {
        this.groupStudents.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  getChatHistory = (groupId: string, sizePerPage: number, pageNo: number) => {
    this.resources.getChatHistory(groupId, sizePerPage, pageNo,
      (response: any) => {
        pageNo++;
        this.prepareChatMessages(response);
        let messages = [...response, ...this.messages.value];
        this.messages.next(messages);
      }, (response: any) => {
        this.commonUtils.openSnackBar(response);
      });
  }

  prepareChatMessages = (messages: any[]) => {
    if (!CommonUtilsService.isEmpty(this.groupStudents.value)) {
      messages.forEach(msg => {
        let user = this.groupStudents.value.find(ur => ur.id === msg.sender);
        msg.userName = user.userName;
        msg.shortName = user.shortName;
      });
    }
  }

  prepareUsers = (users: any) => {
    let groupUsers: any[] = [];
    users.forEach((user: any) => {
      groupUsers.push(this.prepareName(user));
    });

    let loggedInUser: any = this.rootScope.LOGGED_IN_USER.value;
    if (loggedInUser.type !== UserType.STUDENT) {
      groupUsers.push(this.prepareName(loggedInUser))
    }
    return groupUsers;
  }

  prepareName = (user: any) => {
    let name: string = '';
    let shortName: string = '';
    if (!CommonUtilsService.isEmpty(user.firstName)) {
      name = user.firstName;
      shortName = user.firstName[0];
    }
    if (!CommonUtilsService.isEmpty(user.lastName)) {
      name = name + " " + user.lastName;
      shortName = shortName + user.lastName[0];
    }
    user.userName = name;
    user.shortName = shortName;
    return user;
  }
}
