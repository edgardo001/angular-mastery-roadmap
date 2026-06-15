import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  template: `
    <div style="max-width:400px;margin:2rem auto;font-family:sans-serif">
      <h2>Angular 22 + Spring Boot JWT</h2>
      @if (!authService.user()) {
        <input [(ngModel)]="username" placeholder="Username" />
        <input [(ngModel)]="password" type="password" placeholder="Password" />
        <button (click)="login()">Login</button>
        <button (click)="register()">Register</button>
      } @else {
        <p>Logged in as: <strong>{{ authService.user()?.username }}</strong></p>
        <button (click)="authService.logout()">Logout</button>
        <button (click)="callProtected()">Call Protected API</button>
      }
      <pre>{{ result | json }}</pre>
    </div>
  `
})
export class AppComponent {
  username = '';
  password = '';
  result: unknown = null;

  constructor(public authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(r => this.result = r);
  }

  register() {
    this.authService.register(this.username, this.password).subscribe(r => this.result = r);
  }

  callProtected() {
    this.authService.getProtected().subscribe(r => this.result = r);
  }
}
