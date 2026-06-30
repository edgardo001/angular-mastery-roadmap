/**
 * Servicio de Usuarios con CRUD básico.
 *
 * Cada método usa LoggerService para registrar operaciones.
 * Demuestra la inyección de dependencias encadenadas:
 * UserService → LoggerService → APP_CONFIG
 *
 * ANLOGÍA: Es como una "oficina de registros" que mantiene
 * una lista de personas y registra cada consulta que se hace.
 */

import { Injectable, inject } from '@angular/core';
import { LoggerService } from './logger.service';

/** Interfaz de un usuario */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * providedIn: 'platform' significa que el servicio vive en el
 * INJECTOR DE PLATAFORMA (compartido entre todas las apps Angular
 * en la misma página). Es más amplio que 'root'.
 *
 * ANLOGÍA: 'root' es como un departamento en un edificio.
 * 'platform' es como todo el edificio — compartido por todos.
 */
@Injectable({ providedIn: 'platform' })
export class UserService {
  /** LoggerService inyectado — dependencia de UserService */
  private logger = inject(LoggerService);

  /** Retorna todos los usuarios (simula una petición GET) */
  getAll(): User[] {
    this.logger.info('Fetching all users');
    return [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
  }

  /** Busca un usuario por ID */
  getById(id: number): User {
    this.logger.info(\`Fetching user \${id}\`);
    return { id, name: \`User \${id}\`, email: \`user\${id}@example.com\` };
  }

  /** Crea un nuevo usuario */
  create(name: string, email: string): User {
    this.logger.info(\`Creating user: \${name}\`);
    return { id: Date.now(), name, email };
  }

  /** Actualiza el nombre de un usuario */
  update(id: number, name: string): User {
    this.logger.info(\`Updating user \${id} -> \${name}\`);
    return { id, name, email: \`user\${id}@example.com\` };
  }

  /** Elimina un usuario */
  delete(id: number): void {
    this.logger.info(\`Deleting user \${id}\`);
  }
}
