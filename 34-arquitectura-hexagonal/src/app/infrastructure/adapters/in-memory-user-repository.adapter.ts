import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/ports/user-repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  async getAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getById(id: UserId): Promise<User | null> {
    return this.users.get(id.toString()) ?? null;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id.toString(), user);
    return user;
  }

  async delete(id: UserId): Promise<void> {
    this.users.delete(id.toString());
  }
}
