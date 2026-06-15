import { Injectable, Inject, Optional } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: unknown;
}

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private readonly entries: LogEntry[] = [];

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  getAll(): LogEntry[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries.length = 0;
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    const entry: LogEntry = { timestamp: new Date(), level, message, data };
    this.entries.push(entry);
    const fn = level === 'error' ? console.error
      : level === 'warn' ? console.warn
      : level === 'info' ? console.info
      : console.debug;
    fn(`[${level.toUpperCase()}] ${message}`, data);
  }
}
