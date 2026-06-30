// CheckForUpdateService: detecta y aplica actualizaciones de la PWA
// Un Service Worker es un script que se ejecuta en segundo plano
// Almacena archivos de la app en caché para funcionar offline
import { Injectable, inject, signal } from '@angular/core';
// SwUpdate: servicio de Angular para manejar actualizaciones del Service Worker
import { SwUpdate } from '@angular/service-worker';

// providedIn: 'root' = disponible en toda la aplicación
@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {
  // SwUpdate: servicio que detecta cuando hay una nueva versión de la app
  private readonly swUpdate = inject(SwUpdate);
  // Signal que indica si hay una actualización disponible
  readonly updateAvailable = signal(false);

  constructor() {
    // Si el Service Worker no está habilitado, no hacemos nada
    // (en desarrollo normalmente está deshabilitado)
    if (!this.swUpdate.isEnabled) return;
    
    // versionUpdates: Observable que emite eventos cuando hay cambios de versión
    // subscribe(): escucha los eventos que llegan del Service Worker
    this.swUpdate.versionUpdates.subscribe((event) => {
      // VERSION_READY: significa que hay una nueva versión lista para activar
      if (event.type === 'VERSION_READY') {
        this.updateAvailable.set(true); // Mostramos el banner de actualización
      }
    });
  }

  // Activa la nueva versión y recarga la página
  activateUpdate(): void {
    if (this.swUpdate.isEnabled) {
      // activateUpdate(): le dice al Service Worker que use la nueva versión
      //.then(): se ejecuta cuando la actualización se completa
      this.swUpdate.activateUpdate().then(() => document.location.reload());
    }
  }
}
