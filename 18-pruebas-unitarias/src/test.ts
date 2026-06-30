/**
 * ARCHIVO DE CONFIGURACIÓN PARA PRUEBAS UNITARIAS
 * ================================================
 *
 * Este archivo se ejecuta UNA VEZ antes de que comiencen todas las pruebas.
 * Su función es preparar el "laboratorio" donde se ejecutarán los tests.
 *
 * ANÁLOGÍA: Es como preparar una mesa de laboratorio antes de un experimento.
 * Necesitas tener todas las herramientas listas antes de empezar.
 *
 * COMPONENTES CLAVE:
 * - zone.js/testing: Extiende Zone.js para que funcione correctamente en pruebas.
 *   Zone.js es el "reloj interno" de Angular que detecta cambios asincrónicos.
 *
 * - getTestBed: Es el "administrador del laboratorio". Crea entornos de prueba
 *   aislados para cada test, como habitaciones selladas en un laboratorio.
 *
 * - BrowserDynamicTestingModule: Simula un navegador real para las pruebas.
 *   Sin esto, Angular no podría crear componentes en modo testing.
 *
 * - platformBrowserDynamicTesting: Crea una plataforma virtual del navegador
 *   optimizada para pruebas (más rápida que la plataforma real).
 */

// Importa Zone.js en modo testing para manejar asincronía correctamente
import 'zone.js/testing';

// getTestBed es el punto de entrada para configurar el entorno de pruebas
import { getTestBed } from '@angular/core/testing';

// Importa el módulo de testing y la plataforma de testing del navegador
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Inicializa el entorno de pruebas con configuración de navegador dinámico
// Esto crea un "sandbox" aislado para cada grupo de pruebas
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
