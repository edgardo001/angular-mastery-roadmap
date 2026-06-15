import { InjectionToken } from '@angular/core';
import { User, UserId } from '../entities/user';

export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('UserRepository');
