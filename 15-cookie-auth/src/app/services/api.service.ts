// ============================================================================
// SERVICIO DE API (api.service.ts)
// ============================================================================
// Servicio para interactuar con la API protegida por cookies.
// Las cookies se envían automáticamente gracias al interceptor.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz de una tarea (todo) que viene de la API
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Servicio singleton para peticiones a la API
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  // getTodos(): Obtiene la lista de tareas protegidas
  // La cookie HttpOnly se envía automáticamente con cada petición
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}/todos`);
  }

  // createTodo(): Crea una nueva tarea
  // El interceptor XSRF envía el token XSRF automáticamente
  createTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todos`, { title });
  }
}
