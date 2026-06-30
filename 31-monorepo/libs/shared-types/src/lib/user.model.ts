/**
 * Modelo de Usuario
 *
 * Interfaz compartida entre admin y client apps.
 * Garantiza consistencia de tipos en todo el monorepo.
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client' | 'viewer';
  createdAt: Date;
}
