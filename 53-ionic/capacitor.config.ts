// Configuración de Capacitor para compilar la app Angular a plataformas nativas
// (Android, iOS). Capacitor envuelve la app web en un WebView nativo.
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Identificador único de la app (formato inverso de dominio)
  appId: 'com.angularmastery.ionic',

  // Nombre visible en el dispositivo del usuario
  appName: '53-ionic',

  // Directorio donde está el build de producción de Angular
  webDir: 'dist/browser',

  // URL para desarrollo en vivo (reemplaza webDir en desarrollo)
  server: {
    url: 'http://localhost:8080',
    cleartext: true
  },

  // Configuración específica para Android
  android: {
    // Permite que el WebView se comunique con plugins JS
    webContentsDebuggingEnabled: true
  }
};

export default config;
