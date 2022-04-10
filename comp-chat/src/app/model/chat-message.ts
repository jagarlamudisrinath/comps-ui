import { MessageType } from "../enums/message-type";

export class ChatMessage {
    id!: string;
    chatId: string = '';
    content: string = '';
    sender: string = '';
    createdOn: any;
    type: MessageType = MessageType.CHAT;
    persist: boolean = false;
}
