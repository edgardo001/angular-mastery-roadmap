// ============================================================================
// SERVICIO DE USUARIOS (user.service.ts)
// ============================================================================
// Servicio para obtener datos del perfil del usuario y datos de administración.
// Se comunica con la API del servidor usando peticiones HTTP autenticadas.

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Interfaz del perfil de usuario que viene del servidor
export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

// Interfaz de datos de administración (solo para admins)
export interface AdminData {
  message: string;
  users: { id: number; email: string; name: string; role: string }[];
  stats: { totalUsers: number; admins: number; users: number };
}

// Servicio singleton que hace peticiones HTTP autenticadas
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly API = '/api/user';

  // getProfile(): Obtiene el perfil del usuario autenticado
  // El interceptor auth agrega automáticamente el header Authorization
  getProfile() {
    return this.http.get<UserProfile>(`${this.API}/profile`);
  }

  // getAdminData(): Obtiene datos de administración (solo admins)
  // El mock backend verifica el rol del usuario antes de responder
  getAdminData() {
    return this.http.get<AdminData>(`/api/admin/data`);
  }
}
