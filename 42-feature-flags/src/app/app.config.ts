import { ApplicationConfig } from '@angular/core';
import { FeatureFlagsService } from './feature-flags.service';

export const appConfig: ApplicationConfig = {
  providers: [FeatureFlagsService],
};
