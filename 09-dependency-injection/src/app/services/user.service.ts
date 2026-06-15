import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'platform' })
export class UserService {
  private logger = inject(LoggerService);

  getAll(): User[] {
    this.logger.info('Fetching all users');
    return [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
  }

  getById(id: number): User {
    this.logger.info(`Fetching user ${id}`);
    return { id, name: `User ${id}`, email: `user${id}@example.com` };
  }

  create(name: string, email: string): User {
    this.logger.info(`Creating user: ${name}`);
    return { id: Date.now(), name, email };
  }

  update(id: number, name: string): User {
    this.logger.info(`Updating user ${id} -> ${name}`);
    return { id, name, email: `user${id}@example.com` };
  }

  delete(id: number): void {
    this.logger.info(`Deleting user ${id}`);
  }
}
