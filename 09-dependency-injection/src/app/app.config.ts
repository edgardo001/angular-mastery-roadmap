import { ApplicationConfig, InjectionToken } from '@angular/core';
import { APP_CONFIG, DEFAULT_CONFIG, AppConfig } from './config';
import { AnalyticsService, ConsoleAnalyticsService, MockAnalyticsService } from './services/analytics.service';

export const GREETING = new InjectionToken<string>('greeting');

function greetingFactory(config: AppConfig): string {
  return `Bienvenido a ${config.appName} (API: ${config.apiUrl})`;
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: DEFAULT_CONFIG },
    { provide: AnalyticsService, useClass: ConsoleAnalyticsService },
    ConsoleAnalyticsService,
    MockAnalyticsService,
    { provide: GREETING, useFactory: greetingFactory, deps: [APP_CONFIG] },
  ],
};
