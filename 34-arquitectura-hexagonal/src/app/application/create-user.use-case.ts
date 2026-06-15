import { inject, Injectable } from '@angular/core';
import { UserRepository, USER_REPOSITORY } from '../domain/ports/user-repository.port';
import { User } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.value-object';

export interface CreateUserRequest {
  name: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  private readonly repository = inject<UserRepository>(USER_REPOSITORY);

  execute(request: CreateUserRequest): Promise<User> {
    const email = Email.from(request.email);
    const user = User.create(request.name, email);
    return this.repository.create(user);
  }
}
