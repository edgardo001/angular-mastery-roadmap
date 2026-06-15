import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { USER_REPOSITORY } from './domain/ports/user-repository.port';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory-user-repository.adapter';
import { GetUsersUseCase } from './application/get-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';

export function provideUserRepository() {
  return { provide: USER_REPOSITORY, useClass: InMemoryUserRepository };
}

export function provideUseCases() {
  return [
    GetUsersUseCase,
    CreateUserUseCase,
  ];
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideUserRepository(),
    provideUseCases(),
  ],
};
