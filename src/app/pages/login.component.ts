import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.username.trim()) {
      localStorage.setItem('username', this.username); // Save username
      this.router.navigate(['/chat']); // Redirect to chat
    }
  }
}
