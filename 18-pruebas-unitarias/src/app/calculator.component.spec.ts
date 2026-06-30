/**
 * PRUEBAS DE INTEGRACIÓN DEL COMPONENTE CALCULADORA
 * ===================================================
 *
 * Estas pruebas verifican que el COMPONENTE funciona correctamente.
 * A diferencia de las pruebas de servicio, aquí probamos:
 * - Que el componente se crea correctamente
 * - Que el template muestra los datos esperados
 * - Que el usuario puede interactuar con él
 *
 * ANÁLOGÍA: Las pruebas de servicio son como probar el motor de un auto.
 * Las pruebas de integración son como probar que el auto arranca, acelera y frena.
 *
 * PALABRAS CLAVE:
 * - ComponentFixture: Contenedor que crea y gestiona el componente para pruebas
 * - TestBed.createComponent(): Crea una instancia real del componente
 * - fixture.debugElement: Acceso al "árbol" del componente (DOM + Angular)
 * - By.css(): Busca elementos en el template usando selectores CSS
 * - nativeElement: El elemento HTML real del navegador
 * - detectChanges(): Fuerza a Angular a actualizar la vista
 * - fixture.whenStable(): Espera a que todas las operaciones asincrónicas terminen
 */

// import de las herramientas de testing de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// FormsModule: Permite usar [(ngModel)] en el template (two-way binding)
import { FormsModule } from '@angular/forms';

// By: Herramienta para buscar elementos en el template del componente
import { By } from '@angular/platform-browser';

// Servicio y componente que vamos a probar
import { CalculatorService } from './calculator.service';
import { AppComponent } from './app.component';

// describe(): Agrupa las pruebas del componente Calculator
describe('CalculatorComponent', () => {
  // fixture: Contenedor que maneja el componente durante las pruebas
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // beforeEach async(): Se ejecuta antes de cada prueba
  // "async" permite usar await dentro del bloque
  beforeEach(async () => {
    // Configura el módulo de testing con el componente y dependencias
    TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [CalculatorService],
    }).compileComponents(); // Compila los templates y estilos del componente

    // Crea una instancia real del componente
    fixture = TestBed.createComponent(AppComponent);
    // Obtiene la instancia del componente para interactuar con él
    component = fixture.componentInstance;
    // detectChanges(): Fuerza a Angular a renderizar el componente
    // Es como "encender" el componente para ver su contenido
    fixture.detectChanges();
  });

  // PRUEBA 1: Verificar que el componente se crea correctamente
  it('should create the component', () => {
    // toTruthy(): Verifica que el objeto existe (no es null ni undefined)
    expect(component).toBeTruthy();
  });

  // PRUEBA 2: Verificar que el título se muestra en el template
  it('should display the title', () => {
    // query(): Busca un elemento en el template usando un selector CSS
    // By.css('h1'): Busca el primer elemento <h1>
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    // Verifica que el texto del h1 contenga "Calculadora"
    expect(title.textContent).toContain('Calculadora');
  });

  // PRUEBA 3: Verificar operación de suma
  it('should calculate add operation', () => {
    // Simula la entrada del usuario: establece valores en las propiedades
    component.a = 10;
    component.b = 5;
    component.operation = 'add';
    // Llama al método calculate() como si el usuario presionara el botón
    component.calculate();
    // detectChanges() actualiza la vista con los nuevos valores
    fixture.detectChanges();
    // Busca el elemento que muestra el resultado
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    // Verifica que el resultado sea "15" (10 + 5)
    expect(result.textContent.trim()).toBe('15');
  });

  // PRUEBA 4: Verificar operación de resta
  it('should calculate subtract operation', () => {
    component.a = 10;
    component.b = 5;
    component.operation = 'subtract';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('5');
  });

  // PRUEBA 5: Verificar operación de multiplicación
  it('should calculate multiply operation', () => {
    component.a = 4;
    component.b = 3;
    component.operation = 'multiply';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('12');
  });

  // PRUEBA 6: Verificar operación de división
  it('should calculate divide operation', () => {
    component.a = 20;
    component.b = 4;
    component.operation = 'divide';
    component.calculate();
    fixture.detectChanges();
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('5');
  });

  // PRUEBA 7: Verificar que se muestra error al dividir por cero
  it('should show error on division by zero', () => {
    component.a = 5;
    component.b = 0;
    component.operation = 'divide';
    component.calculate();
    fixture.detectChanges();
    // Busca el elemento de error en el template
    const error = fixture.debugElement.query(By.css('.error')).nativeElement;
    expect(error.textContent).toContain('Cannot divide by zero');
  });

  // PRUEBA 8: Verificar que clear() resetea todo correctamente
  it('should clear values', () => {
    // Primero hacemos una operación para tener valores
    component.a = 10;
    component.b = 5;
    component.calculate();
    // Llamamos a clear()
    component.clear();
    fixture.detectChanges();
    // Verifica que las propiedades volvieron a 0
    expect(component.a).toBe(0);
    expect(component.b).toBe(0);
    // Verifica que el resultado en pantalla sea "0"
    const result = fixture.debugElement.query(By.css('.result-value')).nativeElement;
    expect(result.textContent.trim()).toBe('0');
  });
});
