// =============================================================================
// ARCHIVO: main.server.ts (punto de entrada del SERVIDOR)
// PROPÓSITO: Inicia la app Angular en el servidor para renderizado SSR
// =============================================================================
//
// Este archivo es el equivalente de main.ts pero para el SERVIDOR.
// Cuando un usuario visita tu app, el servidor ejecuta este archivo
// para generar el HTML que se enviará al navegador.
//
// Diferencia clave:
// - main.ts se ejecuta en el navegador (carga la app interactiva)
// - main.server.ts se ejecuta en el servidor (genera HTML estático)
//
// Es como la diferencia entre un chef que cocina (servidor) y
// el comensal que come (navegador). El chef prepara el plato antes
// de que llegues al restaurante.
// =============================================================================

// bootstrapApplication: La misma función que en main.ts, pero aquí
// se usa con la configuración del servidor (serverConfig).
import { bootstrapApplication } from '@angular/platform-browser';

// El componente raíz - igual que en el navegador.
import { App } from './app/app';

// La configuración del servidor, que incluye provideServerRendering()
// para habilitar las capacidades de SSR.
import { serverConfig } from './app/app.config.server';

// Exporta la función de bootstrap como valor por defecto.
// El servidor Express (server.ts) importará esta función para
// renderizar la app cuando reciba una petición HTTP.
//
// NOTA: Se usa "export default" porque el servidor necesita importar
// esta función de forma asíncrona con import().
export default bootstrapApplication(App, serverConfig);
