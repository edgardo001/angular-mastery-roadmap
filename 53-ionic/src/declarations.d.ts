// ============================================================
// declarations.d.ts — Declaraciones de tipos para TypeScript
// ============================================================
// TypeScript necesita saber qué tipos de datos existen en las
// librerías que usamos. Este archivo le dice: "existe una librería
// llamada 'ionicons' y tiene estas funciones y exportaciones."
// Sin esto, TypeScript mostraría errores al importar ionicons.

// Declaramos el módulo 'ionicons' para que TypeScript lo reconozca.
// addIcons es una función que registra iconos para usar en la app.
declare module 'ionicons' {
  export function addIcons(icons: Record<string, string>): void;
}

// Declaramos los iconos específicos que usaremos de ionicons.
// Cada icono es un string con el SVG del icono.
declare module 'ionicons/icons' {
  export const home: string;
  export const camera: string;
  export const locate: string;
}
