import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            [(ngModel)]="username"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <div class="password-field">
            <label for="password">Password:</label>
            <input
              [type]="showPassword ? 'text' : 'password'"
              id="password"
              name="password"
              [(ngModel)]="password"
              class="form-control"
              required
            />
            <span class="eye-icon" (click)="togglePasswordVisibility()">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </span>
          </div>
        </div>
        <button type="submit" class="btn">Login</button>
        <p *ngIf="error" style="color: red;">{{ error }}</p>
      </form>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/customers']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}