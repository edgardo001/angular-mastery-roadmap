/**
 * Caso de uso: CreateUser.
 *
 * Encapsula la lógica para crear un usuario nuevo:
 * 1. Valida y crea el value object Email (lanza error si es inválido)
 * 2. Crea la entidad User con el factory method
 * 3. Guarda el usuario en el repositorio
 *
 * Patrón: Use Case encapsula la orquestación de operaciones de negocio.
 * Es como un director de orquesta: dice qué instrumentos tocar (entidad, repositorio)
 * y en qué orden, pero no toca ningún instrumento directamente.
 *
 * Interfaz CreateUserRequest: Define la forma de los datos de entrada.
 * Es como un formulario: el caso de uso espera recibir name y email.
 */
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

  /**
   * Ejecuta el caso de uso:
   * 1. Email.from() valida el email (lanza error si es inválido)
   * 2. User.create() genera la entidad con ID y fecha automática
   * 3. repository.create() guarda en la fuente de datos concreta
   */
  execute(request: CreateUserRequest): Promise<User> {
    const email = Email.from(request.email); // Validación automática
    const user = User.create(request.name, email);
    return this.repository.create(user);
  }
}
