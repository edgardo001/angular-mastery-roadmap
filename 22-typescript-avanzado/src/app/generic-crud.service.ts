/**
 * SERVICIO GENÉRICO CRUD (GenericCrudService)
 * =============================================
 *
 * Implementa operaciones CRUD (Create, Read, Update, Delete) genéricas.
 * Funciona con CUALQUIER tipo que tenga un campo "id".
 *
 * ANÁLOGÍA: Es como un administrador de archivos universal:
 * - getAll(): Lista todos los archivos
 * - getById(): Busca un archivo por su número
 * - create(): Crea un archivo nuevo
 * - update(): Modifica un archivo existente
 * - delete(): Elimina un archivo
 *
 * PALABRAS CLAVE:
 * - <T extends Identifiable>: Parámetro de tipo genérico
 *   T puede ser cualquier tipo que tenga un campo "id"
 * - Partial<T>: Tipo que hace todas las propiedades opcionales
 * - T['id']: Tipo del campo "id" del tipo T
 * - protected: Visible solo dentro de la clase y subclases
 *
 * ¿POR QUÉ GENÉRICO?
 * - Un solo servicio funciona para usuarios, productos, pedidos, etc.
 * - No hay que escribir el mismo código una y otra vez
 * - Si cambias algo, cambias en UN solo lugar
 */

// Injectable: Permite que Angular inyecte este servicio
import { Injectable } from '@angular/core';

// Interfaz que define qué significa tener un "id"
// Cualquier tipo que tenga un campo "id" puede usar este servicio
export interface Identifiable {
  id: string | number; // Puede ser string o número
}

// <T extends Identifiable>: Parámetro de tipo genérico
// T puede ser cualquier tipo que implemente Identifiable
// Ejemplo: GenericCrudService<User>, GenericCrudService<Product>, etc.
@Injectable()
export class GenericCrudService<T extends Identifiable> {
  // protected: Solo accesible dentro de esta clase y subclases
  // Array que almacena todos los elementos
  protected items: T[] = [];

  // getAll(): Retorna una COPIA del array de elementos
  // [...this.items]: Spread operator crea una copia para evitar efectos secundarios
  getAll(): T[] {
    return [...this.items];
  }

  // getById(): Busca un elemento por su ID
  // T['id']: Tipo del campo "id" del tipo T (puede ser string o number)
  getById(id: T['id']): T | undefined {
    // find(): Retorna el primer elemento que cumple la condición
    // Si no encuentra nada, retorna undefined
    return this.items.find(item => item.id === id);
  }

  // create(): Agrega un nuevo elemento al array
  // Retorna el elemento creado
  create(item: T): T {
    // push(): Agrega el elemento al final del array
    this.items.push(item);
    return item;
  }

  // update(): Modifica un elemento existente
  // Partial<T>: Tipo que hace todas las propiedades opcionales
  // Ejemplo: Partial<User> = { id?: number, name?: string, ... }
  update(id: T['id'], partial: Partial<T>): T | undefined {
    // findIndex(): Retorna el índice del elemento que cumple la condición
    // Si no encuentra nada, retorna -1
    const index = this.items.findIndex(item => item.id === id);
    // Si no se encontró el elemento, retorna undefined
    if (index === -1) return undefined;
    // Spread operator: Copia el elemento existente y sobrescribe las propiedades modificadas
    this.items[index] = { ...this.items[index], ...partial };
    return this.items[index];
  }

  // delete(): Elimina un elemento por su ID
  // Retorna true si se eliminó, false si no se encontró
  delete(id: T['id']): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    // splice(): Elimina elementos del array a partir del índice
    // splice(index, 1): Elimina 1 elemento en la posición index
    this.items.splice(index, 1);
    return true;
  }

  // count(): Retorna la cantidad de elementos
  count(): number {
    return this.items.length;
  }
}
