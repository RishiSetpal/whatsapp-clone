import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketService } from './core/socket.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser = '';

  constructor(private router: Router, private socketService: SocketService) {}

  ngOnInit() {
    const username = localStorage.getItem('username');
    if (username) {
      this.currentUser = username;
      this.router.navigate(['/chat']);
    }
  }
}
