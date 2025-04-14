import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  online: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(username: string) {
    const users: User[] = JSON.parse(localStorage.getItem('contacts') || '[]');
    const existing = users.find((u) => u.username === username);
    if (!existing) {
      users.push({ username, online: true });
      localStorage.setItem('contacts', JSON.stringify(users));
    } else {
      existing.online = true;
      localStorage.setItem('contacts', JSON.stringify(users));
    }

    localStorage.setItem('loggedInUser', JSON.stringify({ username }));
    this.router.navigate(['/chat']);
  }

  logout() {
    const loggedInUser = this.getLoggedInUser();
    if (loggedInUser) {
      const users: User[] = JSON.parse(localStorage.getItem('contacts') || '[]');
      const existing = users.find((u) => u.username === loggedInUser.username);
      if (existing) {
        existing.online = false;
        localStorage.setItem('contacts', JSON.stringify(users));
      }
    }

    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }
}
