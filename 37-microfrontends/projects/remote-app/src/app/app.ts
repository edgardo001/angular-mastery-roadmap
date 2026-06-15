import { Component, signal } from '@angular/core';
import { AppEventBus } from './event-bus';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly messages = signal<string[]>([]);

  constructor() {
    AppEventBus.all().subscribe(event => {
      this.messages.update(msgs => [...msgs, `[${event.type}] ${JSON.stringify(event.payload)}`]);
    });
  }

  sendEvent(): void {
    AppEventBus.publish('remote:user-action', { message: 'Hello from Remote!' });
  }
}
