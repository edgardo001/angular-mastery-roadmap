import { Component } from '@angular/core';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { ApiResponse, ROUTES, ApiRoute, CssSize, ServerConfig, FormState, EventName, ApiEndpoint } from './types';
import { GenericCrudService, Identifiable } from './generic-crud.service';

interface User extends Identifiable {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  imports: [JsonPipe, KeyValuePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [GenericCrudService<User>],
})
export class App {
  // Template Literal Types
  templateLiteralExamples = [
    { label: 'EventName', value: 'onClick' satisfies EventName },
    { label: 'ApiRoute', value: '/api/users' satisfies ApiRoute },
    { label: 'CssSize', value: '16px' satisfies CssSize },
    { label: 'ApiEndpoint', value: 'get:/api/products' satisfies ApiEndpoint<'GET'> },
  ] as const;

  // Conditional Types
  responseSuccess: ApiResponse<{ id: number; name: string }> = {
    status: 'success',
    data: { id: 1, name: 'Test' },
    timestamp: Date.now(),
  };

  responseError: ApiResponse<never> = {
    status: 'error',
    error: 'Not found',
    code: 404,
  };

  // satisfies
  config = {
    host: 'localhost',
    port: 4200,
    ssl: false,
    timeout: 5000,
  } satisfies ServerConfig;

  // as const
  routes = ROUTES;
  routeList = Object.values(ROUTES);

  // Mapped Types
  userForm: FormState<{ name: string; email: string; age: number }> = {
    name: { value: '', dirty: false, touched: false, errors: [] },
    email: { value: '', dirty: false, touched: false, errors: [] },
    age: { value: 0, dirty: false, touched: false, errors: [] },
  };

  // Generic CRUD
  crudService = new GenericCrudService<User>();
  crudItems: User[] = [];

  constructor() {
    this.crudService.create({ id: 1, name: 'Alice', email: 'alice@test.com' });
    this.crudService.create({ id: 2, name: 'Bob', email: 'bob@test.com' });
    this.crudService.update(1, { name: 'Alice Updated' });
    this.crudItems = this.crudService.getAll();
  }
}
