import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Welcome!</h2>
      <p>You have successfully logged in.</p>
      <button class="btn" (click)="logout()">Logout</button>
    </div>
  `
})
export class WelcomeComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}