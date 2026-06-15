import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface AdminData {
  message: string;
  users: { id: number; email: string; name: string; role: string }[];
  stats: { totalUsers: number; admins: number; users: number };
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly API = '/api/user';

  getProfile() {
    return this.http.get<UserProfile>(`${this.API}/profile`);
  }

  getAdminData() {
    return this.http.get<AdminData>(`/api/admin/data`);
  }
}
