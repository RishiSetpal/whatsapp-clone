import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  /**
   * Initializes the socket connection to the server
   */
  initSocket(): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io('http://localhost:3000'); 
    }
  }

  /**
   * Emit/send a message to the server
   * @param message Data to send
   */
  sendMessage(message: any): void {
    if (this.socket) {
      this.socket.emit('message', message);
    }
  }

  /**
   * Listen for messages from the server
   * @param callback Function to handle incoming message
   */
  onMessage(callback: (msg: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  /**
   * Emit typing event
   * @param user The user who is typing
   */
  sendTyping(user: string): void {
    if (this.socket) {
      this.socket.emit('typing', user);
    }
  }

  /**
   * Listen for typing events
   * @param callback Function to handle typing event
   */
  onTyping(callback: (user: string) => void): void {
    if (this.socket) {
      this.socket.on('typing', callback);
    }
  }

  /**
   
   * @param messageId Message ID
   */
  sendReadReceipt(messageId: string): void {
    if (this.socket) {
      this.socket.emit('readReceipt', messageId);
    }
  }

  /**
   * Listen for read receipts
   * @param callback Function to handle read receipt event
   */
  onReadReceipt(callback: (messageId: string) => void): void {
    if (this.socket) {
      this.socket.on('readReceipt', callback);
    }
  }

  /**
   * Listen for user online/offline status
   * @param callback Function to handle online/offline status
   */
  onStatusChange(callback: (status: { user: string; status: string }) => void): void {
    if (this.socket) {
      this.socket.on('status', callback);
    }
  }


  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
