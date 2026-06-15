import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

interface MockUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
}

const USERS: MockUser[] = [
  { id: 1, email: 'user@test.com', name: 'Usuario Normal', password: '123456', role: 'user' },
  { id: 2, email: 'admin@test.com', name: 'Admin Poderoso', password: '123456', role: 'admin' },
];

function createFakeJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 3600000 }));
  const sig = btoa('fake-signature');
  return `${header}.${body}.${sig}`;
}

function findUserFromToken(req: HttpRequest<unknown>): MockUser | undefined {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return undefined;
  try {
    const parts = auth.slice(7).split('.');
    if (parts.length !== 3) return undefined;
    const payload = JSON.parse(atob(parts[1]));
    return USERS.find(u => u.id === payload.sub);
  } catch {
    return undefined;
  }
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method } = req;

  if (url.endsWith('/api/auth/login') && method === 'POST') {
    const { email, password } = JSON.parse(JSON.stringify(req.body)) as any;
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const payload = { sub: user.id, email: user.email, name: user.name, role: user.role };
      return of(new HttpResponse({
        status: 200,
        body: {
          user: { id: user.id, email: user.email, name: user.name, role: user.role },
          accessToken: createFakeJwt(payload),
          refreshToken: createFakeJwt({ ...payload, type: 'refresh' }),
        },
      }));
    }
    return throwError(() => new HttpResponse({ status: 401, statusText: 'Unauthorized' }));
  }

  if (url.endsWith('/api/auth/refresh') && method === 'POST') {
    const { refreshToken } = JSON.parse(JSON.stringify(req.body)) as any;
    if (!refreshToken) return throwError(() => new HttpResponse({ status: 401 }));
    try {
      const parts = refreshToken.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const user = USERS.find(u => u.id === payload.sub);
      if (user && payload.type === 'refresh') {
        const newPayload = { sub: user.id, email: user.email, name: user.name, role: user.role };
        return of(new HttpResponse({
          status: 200,
          body: {
            accessToken: createFakeJwt(newPayload),
            refreshToken: createFakeJwt({ ...newPayload, type: 'refresh' }),
          },
        }));
      }
    } catch { /* ignore */ }
    return throwError(() => new HttpResponse({ status: 401 }));
  }

  if (url.endsWith('/api/user/profile') && method === 'GET') {
    const user = findUserFromToken(req);
    if (user) {
      return of(new HttpResponse({
        status: 200,
        body: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: '2025-01-15T10:00:00Z',
        },
      }));
    }
    return throwError(() => new HttpResponse({ status: 401 }));
  }

  if (url.endsWith('/api/admin/data') && method === 'GET') {
    const user = findUserFromToken(req);
    if (user?.role === 'admin') {
      return of(new HttpResponse({
        status: 200,
        body: {
          message: 'Panel de administración',
          users: USERS.map(u => ({ id: u.id, email: u.email, name: u.name, role: u.role })),
          stats: {
            totalUsers: USERS.length,
            admins: USERS.filter(u => u.role === 'admin').length,
            users: USERS.filter(u => u.role === 'user').length,
          },
        },
      }));
    }
    return throwError(() => new HttpResponse({ status: 401 }));
  }

  return next(req);
};
