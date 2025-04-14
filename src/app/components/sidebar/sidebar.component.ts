import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() contacts: any[] = [];

  constructor(private router: Router) {}

  openChat(contact: any) {
    this.router.navigate(['/chat'], { state: { contact } });
  }
}
