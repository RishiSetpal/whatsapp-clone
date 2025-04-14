import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  getContacts() {
    return JSON.parse(localStorage.getItem('contacts') || '[]');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }
}
