import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { appApolloOptions } from './graphql.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    ...appApolloOptions,
  ],
};
