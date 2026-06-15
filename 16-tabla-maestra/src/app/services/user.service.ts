import { Injectable, signal } from '@angular/core';
import type { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private mockUsers: User[] = [
    { id: 1, name: 'María García', email: 'maria@example.com', role: 'Admin' },
    { id: 2, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor' },
    { id: 3, name: 'Ana Martínez', email: 'ana@example.com', role: 'Usuario' },
    { id: 4, name: 'Pedro Sánchez', email: 'pedro@example.com', role: 'Editor' },
    { id: 5, name: 'Lucía Fernández', email: 'lucia@example.com', role: 'Admin' },
    { id: 6, name: 'Jorge Rodríguez', email: 'jorge@example.com', role: 'Usuario' },
    { id: 7, name: 'Sofía González', email: 'sofia@example.com', role: 'Editor' },
    { id: 8, name: 'Diego Ramírez', email: 'diego@example.com', role: 'Usuario' },
    { id: 9, name: 'Valentina Torres', email: 'valentina@example.com', role: 'Admin' },
    { id: 10, name: 'Andrés Morales', email: 'andres@example.com', role: 'Editor' },
    { id: 11, name: 'Camila Vargas', email: 'camila@example.com', role: 'Usuario' },
    { id: 12, name: 'Mateo Castillo', email: 'mateo@example.com', role: 'Usuario' },
    { id: 13, name: 'Isabella Reyes', email: 'isabella@example.com', role: 'Editor' },
    { id: 14, name: 'Santiago Ortiz', email: 'santiago@example.com', role: 'Admin' },
    { id: 15, name: 'Gabriela Mendoza', email: 'gabriela@example.com', role: 'Usuario' },
    { id: 16, name: 'Daniel Herrera', email: 'daniel@example.com', role: 'Editor' },
    { id: 17, name: 'Emma Ríos', email: 'emma@example.com', role: 'Usuario' },
    { id: 18, name: 'Benjamín Campos', email: 'benjamin@example.com', role: 'Admin' },
    { id: 19, name: 'Abigail Peña', email: 'abigail@example.com', role: 'Editor' },
    { id: 20, name: 'Lucas Navarro', email: 'lucas@example.com', role: 'Usuario' },
    { id: 21, name: 'Victoria Silva', email: 'victoria@example.com', role: 'Usuario' },
    { id: 22, name: 'Emilio Guerrero', email: 'emilio@example.com', role: 'Editor' },
    { id: 23, name: 'Martina Delgado', email: 'martina@example.com', role: 'Admin' },
    { id: 24, name: 'Sebastián Paredes', email: 'sebastian@example.com', role: 'Usuario' },
  ];

  readonly users = signal<User[]>([...this.mockUsers]);
}
