import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_CONSTANTS, ROUTES } from './constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === AUTH_CONSTANTS.DEFAULT_USERNAME && password === AUTH_CONSTANTS.DEFAULT_PASSWORD) {
      localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEY, AUTH_CONSTANTS.STORAGE_VALUE);
      this.router.navigate([ROUTES.CUSTOMERS]);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEY);
    this.router.navigate([ROUTES.LOGIN]);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEY) === AUTH_CONSTANTS.STORAGE_VALUE;
  }
}