import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../../core/socket.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit, AfterViewInit {
  @Input() currentUser: string = localStorage.getItem('username') || '';
  @Input() contact: any;
  @Input() selectedUser: any;

  message = '';
  messages: any[] = [];
  showEmojiPicker = false;
  typingIndicator = '';
  isTyping = false;

  @ViewChild('scrollMe') private scrollContainer!: ElementRef;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.initSocket();

    this.socketService.onMessage((msg: any) => {
      this.messages.push(msg);
      setTimeout(() => this.scrollToBottom(), 100);
    });

    this.socketService.onTyping((user: string) => {
      if (user !== this.currentUser) {
        this.typingIndicator = `${user} is typing...`;
        setTimeout(() => (this.typingIndicator = ''), 2000);
      }
    });

    this.socketService.onReadReceipt((messageId: string) => {
      const msg = this.messages.find((msg) => msg.id === messageId);
      if (msg) {
        msg.read = true;
      }
    });

    this.socketService.onStatusChange(
      (status: { user: string; status: string }) => {
        if (status.user === this.selectedUser) {
          console.log(`${status.user} is ${status.status}`);
        }
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  sendMessage() {
    if (!this.message.trim()) return;
    const msg = {
      sender: this.currentUser,
      content: this.message,
      timestamp: new Date(),
      id: new Date().toString(),
      read: false,
    };
    this.socketService.sendMessage(msg);
    // this.messages.push(msg);
    this.message = '';
    this.showEmojiPicker = false;
    setTimeout(() => this.scrollToBottom(), 100);

    this.socketService.sendReadReceipt(msg.id);
  }

  handleTyping() {
    if (this.message.trim() && !this.isTyping) {
      this.isTyping = true;
      this.socketService.sendTyping(this.currentUser);
    } else if (!this.message.trim() && this.isTyping) {
      this.isTyping = false;
      this.socketService.sendTyping('');
    }
  }

  addEmoji(emoji: string) {
    this.message += emoji;
  }

  private scrollToBottom() {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Auto scroll failed:', err);
    }
  }
}
