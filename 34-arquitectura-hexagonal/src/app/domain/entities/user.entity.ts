import { UserId } from '../value-objects/user-id.value-object';
import { Email } from '../value-objects/email.value-object';

export interface UserData {
  id: UserId;
  name: string;
  email: Email;
  createdAt: Date;
}

export class User {
  private constructor(private readonly data: UserData) {}

  static create(name: string, email: Email): User {
    return new User({
      id: UserId.generate(),
      name,
      email,
      createdAt: new Date(),
    });
  }

  static from(data: UserData): User {
    return new User(data);
  }

  get id(): UserId {
    return this.data.id;
  }

  get name(): string {
    return this.data.name;
  }

  get email(): Email {
    return this.data.email;
  }

  get createdAt(): Date {
    return this.data.createdAt;
  }
}
