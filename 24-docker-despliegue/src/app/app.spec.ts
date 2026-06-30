/**
 * PRUEBAS UNITARIAS DEL COMPONENTE DOCKER
 * ==========================================
 *
 * Pruebas básicas para verificar que el componente App se crea correctamente.
 * Estas son pruebas de "smoke" (humo): verifican que la app no se rompió.
 *
 * ANÁLOGÍA: Es como encender un auto para ver si arranca.
 * No probamos todos los botones, solo que funcione lo básico.
 *
 * PALABRAS CLAVE:
 * - TestBed.configureTestingModule: Configura el entorno de pruebas
 * - createComponent: Crea una instancia del componente
 * - fixture.whenStable(): Espera a que termine la carga inicial
 * - nativeElement: El elemento HTML real del componente
 */

// TestBed: Herramienta para crear entornos de prueba aislados
import { TestBed } from '@angular/core/testing';
// Componente que vamos a probar
import { App } from './app';

// describe(): Agrupa las pruebas del componente App
describe('App', () => {
  // beforeEach(): Se ejecuta ANTES de cada prueba
  beforeEach(async () => {
    // Configura el módulo de testing con el componente App
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents(); // Compila templates y estilos
  });

  // PRUEBA 1: Verificar que el componente se crea correctamente
  it('should create the app', () => {
    // Crea una instancia del componente
    const fixture = TestBed.createComponent(App);
    // fixture.componentInstance: Accede a la instancia TypeScript del componente
    const app = fixture.componentInstance;
    // Verifica que el componente exista (no sea null ni undefined)
    expect(app).toBeTruthy();
  });

  // PRUEBA 2: Verificar que el título se renderiza correctamente
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    // whenStable(): Espera a que todas las operaciones asincrónicas terminen
    await fixture.whenStable();
    // nativeElement: Accede al elemento HTML real del navegador
    const compiled = fixture.nativeElement as HTMLElement;
    // querySelector: Busca un elemento por su selector CSS
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, 24-docker-despliegue');
  });
});
