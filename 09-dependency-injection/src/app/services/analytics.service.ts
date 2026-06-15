import { Injectable } from '@angular/core';

export abstract class AnalyticsService {
  abstract track(event: string, data?: Record<string, unknown>): void;
}

@Injectable()
export class ConsoleAnalyticsService extends AnalyticsService {
  override track(event: string, data?: Record<string, unknown>): void {
    console.log(`[Analytics] ${event}`, data ?? {});
  }
}

@Injectable()
export class MockAnalyticsService extends AnalyticsService {
  override track(_event: string, _data?: Record<string, unknown>): void {
    console.log(`[MockAnalytics] ${_event} (not tracked)`);
  }
}
