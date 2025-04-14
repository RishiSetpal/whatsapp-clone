import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contacts-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactsListComponent {
  @Input() contacts: any[] = [];
  @Output() contactSelected = new EventEmitter<any>();
  searchQuery: string = '';

  get filteredContacts() {
    return this.contacts.filter((contact) =>
      contact.name?.toLowerCase()?.includes(this.searchQuery.toLowerCase())
    );
  }

  onContactClick(contact: any) {
    this.contactSelected.emit(contact);
  }
}
