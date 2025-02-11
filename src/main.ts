import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { CustomerListComponent } from './app/customer/customer-list.component';
import { WelcomeComponent } from './app/welcome/welcome.component';
import { AuthGuard } from './app/auth.guard';

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
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
      { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] }
    ])
  ]
});