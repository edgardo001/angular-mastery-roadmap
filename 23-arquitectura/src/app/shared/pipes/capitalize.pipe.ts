/**
 * PIPE CAPITALIZE (CapitalizePipe)
 * =================================
 *
 * Transforma la primera letra de un texto a mayúscula.
 * Es como un "corrector ortográfico" que capitaliza automáticamente.
 *
 * ANÁLOGÍA: Es como el botón "Mayúscula" de un teclado virtual.
 * Convierte "hola" en "Hola".
 *
 * PALABRAS CLAVE:
 * - @Pipe: Decorador que define un pipe Angular
 * - name: Nombre del pipe para usarlo en templates (| capitalize)
 * - PipeTransform: Interfaz que define el método transform()
 * - transform(): Método que realiza la transformación
 *
 * ¿CÓMO SE USA?
 * En el template: {{ 'hola' | capitalize }} → "Hola"
 * En el template: {{ 'hello world' | capitalize }} → "Hello world"
 */

// Pipe: Decorador que define un pipe Angular
// PipeTransform: Interfaz que obliga a implementar el método transform()
import { Pipe, PipeTransform } from '@angular/core';

// @Pipe: Decorador que define el pipe
// name: 'capitalize': Nombre para usarlo en templates (| capitalize)
// standalone: true: El pipe es autocontenido (no necesita NgModule)
@Pipe({ name: 'capitalize', standalone: true })
export class CapitalizePipe implements PipeTransform {
  // transform(): Método que realiza la transformación
  // value: Texto de entrada (el que el usuario pasa al pipe)
  // Retorna: Texto con la primera letra en mayúscula
  transform(value: string): string {
    // Si el valor está vacío o es undefined, retorna string vacío
    if (!value) return '';
    // charAt(0): Obtiene el primer carácter
    // toUpperCase(): Convierte a mayúscula
    // slice(1): Obtiene el resto del string (desde la posición 1)
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
