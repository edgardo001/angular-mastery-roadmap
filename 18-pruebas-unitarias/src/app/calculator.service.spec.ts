/**
 * PRUEBAS UNITARIAS DEL SERVICIO CALCULADORA
 * ============================================
 *
 * Estas pruebas verifican que cada operación matemática funciona correctamente.
 * Aquí NO usamos TestBed porque CalculatorService no depende de ningún otro servicio.
 * Es como probar una calculadora de bolsillo: solo necesitas la calculadora, nada más.
 *
 * DIFERENCIA CON UserService:
 * - UserService necesita TestBed porque depende de HttpClient (peticiones HTTP)
 * - CalculatorService NO necesita TestBed porque es una clase simple
 *
 * ANÁLOGÍA: Probar CalculatorService es como probar una calculadora de mano.
 * Probar UserService es como probar un teléfono que necesita una red telefónica.
 *
 * PALABRAS CLAVE:
 * - expect().toBe(): Verifica igualdad exacta (===)
 * - expect().toEqual(): Verifica igualdad profunda (objeto a objeto)
 * - expect().toThrowError(): Verifica que se lance un error
 */

// Importamos el servicio directamente (sin TestBed porque no tiene dependencias)
import { CalculatorService } from './calculator.service';

// describe(): Agrupa todas las pruebas de CalculatorService
describe('CalculatorService', () => {
  // Variable para almacenar la instancia del servicio
  let service: CalculatorService;

  // beforeEach(): Crea una NUEVA instancia del servicio antes de cada prueba
  // IMPORTANTE: Se crea nueva instancia para que las pruebas no se afecten entre sí
  // Es como tener una calculadora limpia para cada operación que pruebas
  beforeEach(() => {
    service = new CalculatorService();
  });

  // PRUEBA 1: Verificar que la suma funciona correctamente
  it('should add two numbers', () => {
    // expect(service.add(2, 3)).toBe(5): Verifica que 2+3 = 5
    expect(service.add(2, 3)).toBe(5);
    // Verifica que la signal 'result' se actualizó con el valor correcto
    expect(service.result()).toBe(5);
    // Verifica que se registró la operación 'add'
    expect(service.lastOperation()).toBe('add');
  });

  // PRUEBA 2: Verificar que la resta funciona correctamente
  it('should subtract two numbers', () => {
    expect(service.subtract(10, 4)).toBe(6);
    expect(service.result()).toBe(6);
    expect(service.lastOperation()).toBe('subtract');
  });

  // PRUEBA 3: Verificar que la multiplicación funciona correctamente
  it('should multiply two numbers', () => {
    expect(service.multiply(3, 4)).toBe(12);
    expect(service.result()).toBe(12);
    expect(service.lastOperation()).toBe('multiply');
  });

  // PRUEBA 4: Verificar que la división funciona correctamente
  it('should divide two numbers', () => {
    expect(service.divide(10, 2)).toBe(5);
    expect(service.result()).toBe(5);
    expect(service.lastOperation()).toBe('divide');
  });

  // PRUEBA 5: Verificar que la división por cero lanza un error
  it('should throw error on division by zero', () => {
    // toThrowError(): Verifica que la función lance un error con mensaje específico
    // Es como probar que la calculadora muestra "Error" al dividir entre cero
    expect(() => service.divide(5, 0)).toThrowError('Cannot divide by zero');
  });

  // PRUEBA 6: Verificar que el método clear() resetea los valores
  it('should clear result and last operation', () => {
    // Primero hacemos una operación para tener valores no cero
    service.add(5, 3);
    // Llamamos a clear() para resetear
    service.clear();
    // Verifica que result volvió a 0
    expect(service.result()).toBe(0);
    // Verifica que lastOperation volvió a string vacío
    expect(service.lastOperation()).toBe('');
  });
});
