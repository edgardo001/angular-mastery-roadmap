// ============================================================
// home.ts — Página principal de la app Ionic
// ============================================================
// Este es el componente que se muestra al abrir la app.
// Ionic provee componentes predefinidos (IonHeader, IonContent, etc.)
// que se ven como una app nativa. Es como usar piezas de LEGO pre-hechas.

import { Component } from '@angular/core';

// Importamos los componentes de Ionic que usaremos.
// Cada "Ion*" es un componente UI que ya viene con estilos de app móvil.
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,

  // imports: le dice a Angular qué componentes de Ionic usaremos.
  // Es como decir "necesito estas herramientas para construir esta página."
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel],

  // template: el HTML de la página. Usa componentes de Ionic que se ven
  // como una app nativa: encabezado, barra de herramientas, lista, etc.
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Welcome to Ionic + Angular</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Swipe down to refresh</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Ionic 8 with Angular 22</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class HomePage {}
