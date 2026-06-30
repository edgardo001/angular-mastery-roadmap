/**
 * Adaptador de infraestructura: HttpUserRepository.
 *
 * Implementa el puerto UserRepository usando HTTP para comunicarse con un API REST.
 * Es el adaptador que usarías en producción para conectar a un backend real.
 *
 * Convierte entre el modelo de dominio (User) y el modelo de transferencia (UserDto).
 * Es como un traductor: el dominio habla "español" (User) y el API habla "inglés" (UserDto).
 *
 * HttpClient — Servicio de Angular para hacer peticiones HTTP.
 * firstValueFrom() — Convierte un Observable de RxJS en una Promise.
 *   RxJS Observables son "flujos de datos", Promise es un "resultado futuro".
 *   firstValueFrom toma el primer valor del flujo y lo convierte en Promise.
 *
 * Analogía: Este adaptador es como un intermediario que llama al API,
 * traduce los datos, y los entrega al dominio en un formato que entiende.
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserRepository } from '../../domain/ports/user-repository.port';
import { User, UserData } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.value-object';
import { Email } from '../../domain/value-objects/email.value-object';

/**
 * DTO (Data Transfer Object): Formato de datos que usa el API REST.
 * Es diferente al modelo de dominio. El adaptador se encarga de traducir.
 */
interface UserDto {
  id: string;       // ID como string (no como UserId value object)
  name: string;
  email: string;    // Email como string (no como Email value object)
  createdAt: string; // Fecha como string ISO (no como Date)
}

@Injectable()
export class HttpUserRepository implements UserRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/users'; // URL base del API

  /** Obtiene todos los usuarios y los convierte al modelo de dominio */
  async getAll(): Promise<User[]> {
    const dtos = await firstValueFrom(this.http.get<UserDto[]>(this.baseUrl));
    return dtos.map(dto => this.toDomain(dto)); // Convierte cada DTO a entidad
  }

  /** Obtiene un usuario por ID. Retorna null si no existe (error 404). */
  async getById(id: UserId): Promise<User | null> {
    try {
      const dto = await firstValueFrom(this.http.get<UserDto>(`${this.baseUrl}/${id}`));
      return this.toDomain(dto);
    } catch {
      return null; // Si el API retorna 404, retornamos null
    }
  }

  /** Crea un usuario enviando POST al API */
  async create(user: User): Promise<User> {
    const payload = { name: user.name, email: user.email.toString() };
    const dto = await firstValueFrom(this.http.post<UserDto>(this.baseUrl, payload));
    return this.toDomain(dto);
  }

  /** Elimina un usuario enviando DELETE al API */
  async delete(id: UserId): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`));
  }

  /**
   * Convierte un DTO del API a una entidad de dominio.
   * Esta es la traducción: de formato técnico a formato de negocio.
   */
  private toDomain(dto: UserDto): User {
    return User.from({
      id: UserId.from(dto.id),
      name: dto.name,
      email: Email.from(dto.email),
      createdAt: new Date(dto.createdAt),
    });
  }
}
