import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { CustomerListComponent } from './app/customer/customer-list.component';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { AuthGuard } from './app/auth.guard';
import { ROUTES } from './app/constants/app.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: ROUTES.ROOT, redirectTo: ROUTES.LOGIN, pathMatch: 'full' },
      { path: ROUTES.LOGIN.slice(1), component: LoginComponent },
      { path: ROUTES.WELCOME.slice(1), component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: ROUTES.CUSTOMERS.slice(1), component: CustomerListComponent, canActivate: [AuthGuard] }
    ])
  ]
});