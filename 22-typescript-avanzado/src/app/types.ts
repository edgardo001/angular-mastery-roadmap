// Template Literal Types
export type EventName = `on${Capitalize<string>}`;
export type ApiRoute = `/api/${string}`;
export type CssSize = `${number}${'px' | 'rem' | 'em' | '%'}`;
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ApiEndpoint<M extends HttpMethod> = `${Lowercase<M>}:/api/${string}`;

// Conditional Types
export type ApiResponse<T> =
  | { status: 'success'; data: T; timestamp: number }
  | { status: 'error'; error: string; code: number };

export type ExtractSuccess<T> = T extends { status: 'success'; data: infer D } ? D : never;
export type ExtractError<T> = T extends { status: 'error'; error: infer E } ? E : never;

// satisfies
export interface ServerConfig {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
}

export type StrictServerConfig = {
  [K in keyof ServerConfig]: ServerConfig[K];
};

// as const
export const ROUTES = {
  HOME: '/home',
  ABOUT: '/about',
  PRODUCTS: '/products',
  CONTACT: '/contact',
  LOGIN: '/login',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// Mapped Types
export type FormState<T extends Record<string, unknown>> = {
  [K in keyof T]: {
    value: T[K];
    dirty: boolean;
    touched: boolean;
    errors: string[];
  };
};

export type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
};
