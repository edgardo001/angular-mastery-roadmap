import { Injectable, inject } from '@angular/core';
import { APP_CONFIG } from '../config';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private config = inject(APP_CONFIG);

  info(msg: string): void {
    if (this.config.debug) {
      console.log(`[INFO] ${msg}`);
    }
  }

  warn(msg: string): void {
    console.warn(`[WARN] ${msg}`);
  }

  error(msg: string): void {
    console.error(`[ERROR] ${msg}`);
  }
}
