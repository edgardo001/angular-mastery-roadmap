import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe, DecimalPipe } from '@angular/common';
import { LoggerService } from './logger.service';
import { WebVitalsService } from './web-vitals.service';

@Component({
  selector: 'app-root',
  imports: [DatePipe, UpperCasePipe, DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly logger = inject(LoggerService);
  readonly webVitals = inject(WebVitalsService);

  logDebug(): void {
    this.logger.debug('Debug message', { key: 'value' });
  }

  logInfo(): void {
    this.logger.info('Info message', { user: 'test' });
  }

  logWarn(): void {
    this.logger.warn('Warning message', { threshold: 0.9 });
  }

  logError(): void {
    this.logger.error('Error message', { code: 500 });
  }

  triggerGlobalError(): void {
    throw new Error('Simulated error for Sentry');
  }

  get logs() {
    return this.logger.getAll();
  }
}
