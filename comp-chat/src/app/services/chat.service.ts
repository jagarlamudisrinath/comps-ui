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
  subscription: any;
  groupStudents: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  messages: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private rootScope: RootScopeService,
    private resources: ResourcesService,
    private commonUtils: CommonUtilsService
  ) { }

  connect = (groupId: string) => {
    const that = this;
    const serverUrl = this.rootScope.APP_ROOT_URL + "/ws/";
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({ groupId: groupId }, function (frame: any) {
      that.subscribe(groupId);

    });
  }

  subscribe = (groupId: string) => {
    this.subscription = this.stompClient.subscribe('/topic/' + groupId, (message: any) => {
      if (message.body) {
        let msg = JSON.parse(message.body);
        let user = this.getUserById(msg.sender);
        user = this.prepareName(user);
        msg.userName = user.userName;
        msg.shortName = user.shortName;
        this.messages.value.push(msg);
      }
    });
    this.rootScope.updateRequestsCount('REMOVE');
    this.isConnected.next(true);
  }

  disconnect = (groupId: string) => {
    const that = this;
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    this.stompClient.disconnect(function () {
      that.stompClient = undefined;
      that.isConnected.next(false);
    });
  }


  sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
  }

  getGroupStudents = (groupId: string, professor: User) => {
    this.resources.getGroupStudents(groupId,
      (response: any[]) => {
        let users: any[] = this.prepareUsers(response, professor);
        this.groupStudents.next(users);
      }, (response: any) => {
        this.groupStudents.next([]);
        this.commonUtils.openSnackBar(response);
      });
  }

  getChatHistory = (groupId: string, sizePerPage: number, pageNo: number, s: any) => {
    this.resources.getChatHistory(groupId, sizePerPage, pageNo,
      (response: any) => {
        let messages: any[] = [];
        if (!CommonUtilsService.isEmpty(response)) {
          let orderedMessages = response.reverse();
          this.prepareChatMessages(orderedMessages);
          messages = [...orderedMessages, ...this.messages.value];
        } else {
          messages = this.messages.value;
        }
        this.messages.next(messages);
        s(response.length);
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

  prepareUsers = (users: any, professor: User) => {
    let groupUsers: any[] = [];
    users.forEach((user: any) => {
      groupUsers.push(this.prepareName(user));
    });

    let loggedInUser: any = this.rootScope.LOGGED_IN_USER.value;
    if (loggedInUser.type !== UserType.STUDENT) {
      groupUsers.push(this.prepareName(loggedInUser))
    } else {
      groupUsers.push(this.prepareName(professor))
    }
    return groupUsers;
  }

  getUserById = (userId: string) => {
    return this.groupStudents.value.find(user => user.id === userId);
  }

  prepareName = (user: any) => {
    let name: string = '';
    let shortName: string = '';
    if (!CommonUtilsService.isEmpty(user.firstName)) {
      name = user.firstName;
      shortName = user.firstName[0].toUpperCase();
    }
    if (!CommonUtilsService.isEmpty(user.lastName)) {
      name = name + " " + user.lastName;
      shortName = shortName + user.lastName[0].toUpperCase();
    }
    user.userName = name;
    user.shortName = shortName;
    return user;
  }
}
