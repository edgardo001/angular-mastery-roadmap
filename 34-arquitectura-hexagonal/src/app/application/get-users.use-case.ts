import { inject, Injectable } from '@angular/core';
import { UserRepository, USER_REPOSITORY } from '../domain/ports/user-repository.port';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class GetUsersUseCase {
  private readonly repository = inject<UserRepository>(USER_REPOSITORY);

  execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}
