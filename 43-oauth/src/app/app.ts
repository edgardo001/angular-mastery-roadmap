import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly auth = inject(AuthService);

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }
}
