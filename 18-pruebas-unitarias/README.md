## 18 — Pruebas Unitarias

Testing en Angular con TestBed, Jasmine/Karma, y Jest: componentes, servicios, pipes, directivas y HTTP.

> **Propósito:** Escribir pruebas unitarias robustas con TestBed, HttpClientTestingController, spies y señales para servicios y componentes Angular.
>
> **Problema que resuelve:** Sin tests, cada cambio en el código puede romper funcionalidad existente sin previo aviso, especialmente en apps con múltiples servicios y dependencias.
>
> **Cómo lo resuelve:** TestBed configura módulos de prueba aislados, HttpClientTestingController mockea peticiones HTTP, spies verifican llamadas a métodos, y las señales simplifican la verificación de estado.
>
> **Por qué aprenderlo:** Las pruebas unitarias son la red de seguridad del desarrollador; permiten refactorizar con confianza y son requisito en todo proyecto enterprise.

### Conceptos Clave

- **TestBed**: `configureTestingModule`, `createComponent`, `inject`
- **`HttpClientTestingController`**: mock de peticiones HTTP
- **ComponentFixture**: `detectChanges`, `query(By.css)`, `nativeElement`
- **Jasmine**: `describe`, `it`, `expect`, `spyOn`, `jasmine.createSpy`
- **Jest**: configuración con `@angular-builders/jest` o `jest-preset-angular`
- **Mocks**: servicios mock, `provideMock`, `@angular/core/testing`
- **Pruebas de señales**: verificar valores de `signal()` y `computed()`
- **Pruebas de formularios**: setear valores, disparar eventos
- **Cobertura**: `ng test --code-coverage` o `jest --coverage`

### Proyecto

Suite completa de pruebas para componentes de la tabla maestra (módulo 16): pruebas unitarias con coverage > 80%.

### Ejercicios

1. Prueba un servicio con HttpClient mocking
2. Prueba un componente standalone con señales
3. Prueba un formulario reactivo (válido/inválido)
4. Prueba un pipe personalizado
5. Mockea una señal de servicio y verifica el rendering

### Cómo ejecutar

```bash
cd 18-pruebas-unitarias
npm install
ng test
```
