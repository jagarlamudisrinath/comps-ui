import { Injectable } from '@angular/core';
import { ChatMessage } from '../model/chat-message';
declare var SockJS: any;
declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  stompClient: any;
  messages: any[] = [];
  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;

    this.stompClient.connect({}, function (frame: any) {
      that.stompClient.subscribe('/message', (message: any) => {
        if (message.body) {
          that.messages.push(message.body);
        }
      });
    });
  }

  sendMessage(chatMessage: ChatMessage) {
    this.stompClient.send('/app/topic', {}, chatMessage);
  }
}
