import { Component } from '@angular/core';
import { ContactsListComponent } from '../components/contact-list/contact-list.component';
import { ChatWindowComponent } from '../components/chat-window/chat-window.component';
import { SettingsComponent } from './settings.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ContactsListComponent, SettingsComponent, ChatWindowComponent], // Import here
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatPageComponent {
  selectedContact: any;
  currentUser = 'User1';  // Example current user
  contacts = [
    { username: 'Alice', online: true },
    { username: 'Bob', online: false },
    { username: 'Charlie', online: true },
  ]; // Example contacts data
  
  isDarkTheme = false; // Variable to control dark theme

  onContactSelected(contact: any) {
    this.selectedContact = contact;
  }

  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
