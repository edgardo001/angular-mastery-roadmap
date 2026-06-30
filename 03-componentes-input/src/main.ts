// ──────────────────────────────────────────────
// main.ts — Punto de entrada de la aplicación
// ──────────────────────────────────────────────
//
// Este es el PRIMER archivo que ejecuta Angular cuando inicias la app.
// Su trabajo es "arrancar" (bootstrap) la aplicación.
//
// Analogía: Imagina que estás encendiendo una fábrica.
// main.ts es el botón de encendido que activa toda la maquinaria.
//
// Flujo:
//   1. Angular lee main.ts
//   2. Ejecuta bootstrapApplication() con el componente raíz
//   3. Angular crea el primer componente (AppComponent)
//   4. Todo lo demás se carga desde ahí

// import: trae funciones de librerías externas
// bootstrapApplication: función de Angular que arranca una app standalone
// 'standalone' significa que NO necesitas módulos NgModule (forma moderna de Angular)
import { bootstrapApplication } from '@angular/platform-browser';

// import: trae nuestro componente raíz (el componente principal de toda la app)
// './app/app.component' es la ruta al archivo del componente
// Angular busca el archivo app.component.ts en esa carpeta
import { AppComponent } from './app/app.component';

// import: trae la configuración de la aplicación
// appConfig contiene things como providers (servicios) que la app necesita
// En este ejemplo está vacío, pero en apps reales aquí van servicios HTTP, router, etc.
import { appConfig } from './app/app.config';

// bootstrapApplication: arranca la app con:
//   1er parámetro: AppComponent → el componente raíz (el "tronco del árbol")
//   2do parámetro: appConfig → configuración (providers, etc.)
//
// .catch(console.error): si hay un error al arrancar, lo muestra en la consola
// Es como un "try-catch" pero para el arranque de la app
bootstrapApplication(AppComponent, appConfig).catch(console.error);
