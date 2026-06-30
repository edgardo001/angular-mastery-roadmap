/**
 * SERVICIO DE CALCULADORA (CalculatorService)
 * ============================================
 *
 * Un SERVICIO en Angular es una clase que encapsula lógica de negocio reutilizable.
 * Este servicio implementa operaciones matemáticas básicas.
 *
 * ANÁLOGÍA: Es como una calculadora de bolsillo. Le das números, presionas
 * una operación, y te devuelve el resultado. También recuerda la última operación.
 *
 * PALABRAS CLAVE:
 * - signal(): Crea una variable reactiva. Angular vigila su valor automáticamente.
 *   Cuando cambia, los componentes que la usan se actualizan solos.
 * - readonly: Solo se puede LEER el valor desde fuera. Para cambiarlo,
 *   se usan métodos específicos (set, update).
 * - inject(): Forma moderna de obtener servicios (reemplaza constructor injection).
 * - throw: Lanza un error cuando algo sale mal (división por cero).
 */

// Injectable permite que Angular gestione esta clase como servicio
import { Injectable, signal } from '@angular/core';

// providedIn: 'root' = disponible en toda la aplicación (singleton)
// Es como tener UNA sola calculadora para toda la empresa
@Injectable({ providedIn: 'root' })
export class CalculatorService {
  // signal<number>(0): Crea una signal con valor inicial 0
  // Una signal es una variable que "emite" su valor cuando cambia
  // Los componentes que la usan se actualizan automáticamente
  readonly result = signal<number>(0);

  // Signal para almacenar la última operación realizada
  readonly lastOperation = signal<string>('');

  // Método para sumar dos números
  // Retorna el resultado y actualiza las signals
  add(a: number, b: number): number {
    const r = a + b;
    // .set() actualiza el valor de la signal
    // Es como cambiar el número en la pantalla de la calculadora
    this.result.set(r);
    this.lastOperation.set('add');
    return r;
  }

  // Método para restar dos números
  subtract(a: number, b: number): number {
    const r = a - b;
    this.result.set(r);
    this.lastOperation.set('subtract');
    return r;
  }

  // Método para multiplicar dos números
  multiply(a: number, b: number): number {
    const r = a * b;
    this.result.set(r);
    this.lastOperation.set('multiply');
    return r;
  }

  // Método para dividir dos números
  // Incluye validación: no se puede dividir por cero
  divide(a: number, b: number): number {
    // throw new Error(): Detiene la ejecución y lanza un error
    // Es como la calculadora mostrando "Error" cuando intentas algo inválido
    if (b === 0) throw new Error('Cannot divide by zero');
    const r = a / b;
    this.result.set(r);
    this.lastOperation.set('divide');
    return r;
  }

  // Método para reiniciar la calculadora
  // Pone todos los valores a su estado inicial
  clear(): void {
    this.result.set(0);
    this.lastOperation.set('');
  }
}
