// ============================================================
// app.ts — Componente raíz con tabs (pestañas) de Ionic
// ============================================================
// Este es el componente principal que muestra las pestañas en la parte
// inferior de la pantalla. Es como la barra de navegación de Instagram
// o WhatsApp: Home, Camera, GPS son las pestañas que el usuario puede tocar.

import { Component } from '@angular/core';

// Componentes de Ionic para crear la navegación por tabs.
// IonTabs: contenedor que maneja las pestañas.
// IonTabBar: la barra inferior con los botones.
// IonRouterOutlet: donde se muestra el contenido de cada pestaña.
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';

// addIcons: función para registrar iconos de Ionicons.
import { addIcons } from 'ionicons';

// Importamos los iconos específicos que usaremos.
import { home, camera, locate } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,

  // imports: necesitamos todos los componentes de Ionic que usamos en el template.
  imports: [IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet],

  // template: la estructura de las tabs. Cada ion-tab-button tiene un "tab"
  // que coincide con las rutas en app.routes.ts.
  template: `
    <ion-app>
      <ion-tabs>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home">
            <ion-icon name="home"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="camera">
            <ion-icon name="camera"></ion-icon>
            <ion-label>Camera</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="gps">
            <ion-icon name="locate"></ion-icon>
            <ion-label>GPS</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
        <ion-router-outlet />
      </ion-tabs>
    </ion-app>
  `
})
export class App {
  constructor() {
    // addIcons registra los iconos para que Ionic los pueda usar.
    // Es como darle a Ionic un "catálogo" de iconos disponibles.
    addIcons({ home, camera, locate });
  }
}
