// Componente principal de la PWA (Progressive Web App)
// Una PWA puede funcionar offline, instalarse en el dispositivo, y enviar notificaciones
import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Servicio que detecta actualizaciones del Service Worker
import { CheckForUpdateService } from './check-for-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app">
      <!-- Banner de actualización: se muestra cuando hay nueva versión -->
      @if (updateService.updateAvailable()) {
        <div class="banner">
          New version available!
          <button (click)="updateService.activateUpdate()">Update</button>
        </div>
      }
      <header>
        <h1>PWA Notes</h1>
        <!-- Indicador de estado online/offline -->
        <!-- [class.online] y [class.offline]: clases CSS condicionales -->
        <span class="status" [class.online]="online()" [class.offline]="!online()">
          {{ online() ? 'Online' : 'Offline' }}
        </span>
      </header>
      <main>
        <!-- Aviso cuando no hay conexión a internet -->
        @if (!online()) {
          <div class="offline-notice">You are offline. Changes will sync when connected.</div>
        }
        <!-- Banner de instalación: se muestra cuando el navegador permite instalar la PWA -->
        @if (showInstallPrompt()) {
          <div class="install-banner">
            Install this app for offline access!
            <button (click)="installApp()">Install</button>
            <button (click)="showInstallPrompt.set(false)">Dismiss</button>
          </div>
        }
        <div class="content">
          <p>This app works offline! Try disconnecting from the internet.</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app { max-width: 600px; margin: 0 auto; padding: 2rem; }
    header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
    .status { font-size: 0.75rem; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
    .online { background: #dcfce7; color: #16a34a; }
    .offline { background: #fef2f2; color: #ef4444; }
    .banner, .install-banner { background: #eef2ff; color: #6366f1; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .offline-notice { background: #fef2f2; color: #ef4444; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; }
    button { padding: 4px 12px; border: 1px solid #6366f1; background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .content { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  `]
})
export class AppComponent implements OnInit {
  // inject(): obtiene el servicio de actualización
  readonly updateService = inject(CheckForUpdateService);
  
  // signal(): estado reactivo de la conexión
  // navigator.onLine: propiedad nativa del navegador que indica si hay conexión
  readonly online = signal(navigator.onLine);
  
  // signal que controla si se muestra el banner de instalación
  readonly showInstallPrompt = signal(false);
  
  // Variable para almacenar el evento de instalación diferida
  private deferredPrompt: any;

  // @HostListener: escucha eventos del navegador (window, document, etc.)
  // 'window:online': se dispara cuando el navegador recuper conexión
  @HostListener('window:online')
  onOnline() { this.online.set(true); }

  // 'window:offline': se dispara cuando el navegador pierde conexión
  @HostListener('window:offline')
  onOffline() { this.online.set(false); }

  ngOnInit() {
    // beforeinstallprompt: evento del navegador que indica que se puede instalar la PWA
    // Solo se dispara en navegadores compatibles (Chrome, Edge, etc.)
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // Prevenimos el comportamiento por defecto
      this.deferredPrompt = e; // Guardamos el evento para usarlo después
      this.showInstallPrompt.set(true); // Mostramos el banner de instalación
    });
  }

  // Muestra el diálogo de instalación del navegador
  installApp() {
    if (this.deferredPrompt) {
      // prompt(): muestra el diálogo nativo del navegador "¿Instalar esta app?"
      this.deferredPrompt.prompt();
      // userChoice: Promise que se resuelve con la decisión del usuario
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null; // Limpiamos la referencia
        this.showInstallPrompt.set(false); // Ocultamos el banner
      });
    }
  }
}
