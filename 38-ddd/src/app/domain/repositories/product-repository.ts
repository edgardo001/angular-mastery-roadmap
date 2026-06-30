/**
 * Puerto de salida: Interfaz ProductRepository.
 *
 * Define las operaciones de persistencia para la entidad Product.
 * Cada entidad aggregate tiene su propio repositorio.
 *
 * InjectionToken — Token de inyección para desacoplamiento.
 */
import { InjectionToken } from '@angular/core';
import { Product, ProductId } from '../entities/product';

/** Interfaz que define las operaciones de persistencia de productos */
export interface ProductRepository {
  findById(id: ProductId): Promise<Product | null>;  // Buscar por ID
  save(product: Product): Promise<void>;              // Guardar producto
}

/** Token de inyección para el repositorio de productos */
export const PRODUCT_REPOSITORY = new InjectionToken<ProductRepository>('ProductRepository');
