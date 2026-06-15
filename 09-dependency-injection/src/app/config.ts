import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  appName: string;
  debug: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const DEFAULT_CONFIG: AppConfig = {
  apiUrl: 'http://localhost:3000/api',
  appName: 'Angular DI Demo',
  debug: false,
};

export const OPTIONAL_FEATURE = new InjectionToken<string>('optional.feature');
