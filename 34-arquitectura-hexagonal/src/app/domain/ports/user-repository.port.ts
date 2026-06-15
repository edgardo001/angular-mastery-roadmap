import { InjectionToken } from '@angular/core';
import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.value-object';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(id: UserId): Promise<User | null>;
  create(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository');
