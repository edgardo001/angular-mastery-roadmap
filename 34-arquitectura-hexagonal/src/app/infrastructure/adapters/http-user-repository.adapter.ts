import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserRepository } from '../../domain/ports/user-repository.port';
import { User, UserData } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { Email } from '../../domain/value-objects/email.value-object';

interface UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

@Injectable()
export class HttpUserRepository implements UserRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/users';

  async getAll(): Promise<User[]> {
    const dtos = await firstValueFrom(this.http.get<UserDto[]>(this.baseUrl));
    return dtos.map(dto => this.toDomain(dto));
  }

  async getById(id: UserId): Promise<User | null> {
    try {
      const dto = await firstValueFrom(this.http.get<UserDto>(`${this.baseUrl}/${id}`));
      return this.toDomain(dto);
    } catch {
      return null;
    }
  }

  async create(user: User): Promise<User> {
    const payload = { name: user.name, email: user.email.toString() };
    const dto = await firstValueFrom(this.http.post<UserDto>(this.baseUrl, payload));
    return this.toDomain(dto);
  }

  async delete(id: UserId): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  private toDomain(dto: UserDto): User {
    return User.from({
      id: UserId.from(dto.id),
      name: dto.name,
      email: Email.from(dto.email),
      createdAt: new Date(dto.createdAt),
    });
  }
}
