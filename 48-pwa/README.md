## 48 ÔÇö PWA (Progressive Web App)

Aplicaci├│n web progresiva con Angular: Service Worker, IndexedDB, offline-first, y push notifications.

> **Prop├│sito:** Convertir Angular en Progressive Web App: service worker, manifest, offline support, push notifications, caching strategies y Lighthouse audit.
>
> **Problema que resuelve:** Las SPAs tradicionales no funcionan sin internet, no se pueden instalar en el homescreen y no env├¡an notificaciones push como apps nativas.
>
> **C├│mo lo resuelve:** @angular/service-worker con caching strategies (CacheFirst, NetworkFirst, StaleWhileRevalidate), manifest.json para instalaci├│n, Web Push API para notificaciones.
>
> **Por qu├® aprenderlo:** PWAs ofrecen experiencia nativa sin pasar por app stores; mejoran engagement (push notifications), retenci├│n (instalable) y alcance (no requiere descarga).

### Conceptos Clave

- **`@angular/pwa`**: `ng add @angular/pwa`, `ngsw-config.json`
- **Service Worker**: `SwPush`, `SwUpdate`, `SwRegistration`
- **Estrategias de cach├®**: `performance`, `freshness`, network-first
- **Offline-first**: app funcional sin conexi├│n, sincronizaci├│n posterior
- **IndexedDB**: `idb` library, `Dexie.js`, almacenamiento offline
- **Manifest**: `manifest.webmanifest`, `icons`, `display: standalone`
- **Push notifications**: `SwPush`, `requestSubscription()`, VAPID keys
- **Update management**: `SwUpdate.versionUpdates`, `activateUpdate()`
- **`@angular/service-worker`**: `ServiceWorkerModule`, `SwRegistrationOptions`

### Proyecto

App de notas offline-first con Angular PWA: crear/editar offline, sincronizar al reconectar, notificaciones push.

### Ejercicios

1. A├▒ade PWA con `ng add @angular/pwa`
2. Configura estrategias de cach├® en `ngsw-config.json`
3. Implementa almacenamiento offline con IndexedDB
4. Agrega push notifications con VAPID
5. Muestra indicador de conectividad/offline

### C├│mo ejecutar

```bash
cd 48-pwa
npm install
ng build && ng serve --configuration production
```
