import { Component, inject, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS, GetUsersResponse, User } from './users.query';
import { CREATE_USER, CreateUserInput } from './create-user.mutation';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly apollo = inject(Apollo);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);

  constructor() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.apollo.watchQuery<GetUsersResponse>({ query: GET_USERS } as any).valueChanges
      .subscribe({
        next: (result) => {
          this.users.set((result.data as GetUsersResponse)?.users ?? []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  createUser(name: string, email: string): void {
    this.apollo.mutate<{ createUser: User }, CreateUserInput>({
      mutation: CREATE_USER as any,
      variables: { name, email },
      refetchQueries: [{ query: GET_USERS as any }],
    } as any).subscribe();
  }
}
