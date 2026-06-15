## 53 ÔÇö Ionic + Capacitor (Mobile con Angular)

Aplicaciones m├│viles con Angular usando Ionic + Capacitor: navegaci├│n, APIs nativas, c├ímara, GPS, y almacenamiento.

> **Prop├│sito:** Desarrollar aplicaciones m├│viles nativas con Ionic + Capacitor + Angular: acceso a APIs nativas (c├ímara, GPS, notificaciones) y build para iOS/Android.
>
> **Problema que resuelve:** Desarrollar apps nativas separadas (Swift + Kotlin) duplica esfuerzo y requiere equipos especializados; las PWAs no acceden a todas las APIs nativas.
>
> **C├│mo lo resuelve:** Ionic con componentes nativos iOS/Android, Capacitor plugins para c├ímara/GPS/notificaciones, y mismo c├│digo Angular para web + m├│vil con build nativo.
>
> **Por qu├® aprenderlo:** Ionic + Angular permite llegar a web, iOS y Android con el mismo c├│digo base; reducci├│n de costos del 60% vs equipos nativos separados.

### Conceptos Clave

- **Ionic**: `@ionic/angular`, componentes iOS/Android, `ion-tabs`, `ion-nav`
- **Capacitor**: `@capacitor/core`, plugins nativos (c├ímara, GPS, notificaciones)
- **Navegaci├│n**: `ion-router-outlet`, Angular Router integrado
- **C├ímara**: `@capacitor/camera`, galer├¡a, permisos
- **GPS**: `@capacitor/geolocation`, mapas, seguimiento
- **Almacenamiento local**: `@capacitor/storage`, `@capacitor/preferences`
- **Push**: `@capacitor/push-notifications`, Firebase Cloud Messaging
- **Haptics**: `@capacitor/haptics`, feedback t├íctil
- **Build nativo**: Capacitor build, Android Studio/Xcode
- **PWA + Ionic**: modo web + app nativa desde mismo c├│digo

### Proyecto

App m├│vil con Ionic: login, lista con c├ímara, mapa con GPS, almacenamiento offline, y notificaciones push.

### Ejercicios

1. Crea proyecto Ionic con Angular
2. Implementa tabs de navegaci├│n
3. Integra c├ímara para tomar/fotos de galer├¡a
4. Muestra ubicaci├│n actual en mapa
5. Compila APK/IPA con Capacitor

### C├│mo ejecutar

```bash
cd 53-ionic
npm install
ionic serve
# Para nativo:
ionic build && npx cap open android
```
