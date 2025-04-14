import { Injectable } from '@angular/core';

import {Message} from '../models/message.model';
@Injectable({ providedIn: 'root' })
export class ChatService {
  private messages: { [chatId: string]: Message[] } = {};

  getMessages(chatId: string): Message[] {
    return this.messages[chatId] || [];
  }

  addMessage(chatId: string, message: Message) {
    if (!this.messages[chatId]) {
      this.messages[chatId] = [];
    }
    this.messages[chatId].push(message);
  }
}
