import { Component, inject, signal } from '@angular/core';
import { GetUsersUseCase } from './application/get-users.use-case';
import { CreateUserUseCase } from './application/create-user.use-case';
import { User } from './domain/entities/user.entity';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly getUsers = inject(GetUsersUseCase);
  private readonly createUser = inject(CreateUserUseCase);

  readonly users = signal<User[]>([]);
  readonly status = signal('Ready');

  async loadUsers(): Promise<void> {
    this.status.set('Loading...');
    const users = await this.getUsers.execute();
    this.users.set(users);
    this.status.set(`Loaded ${users.length} users`);
  }

  async addUser(): Promise<void> {
    this.status.set('Creating...');
    const name = `User ${Math.floor(Math.random() * 1000)}`;
    const email = `user${Math.floor(Math.random() * 1000)}@example.com`;
    await this.createUser.execute({ name, email });
    this.status.set('User created');
    await this.loadUsers();
  }
}
