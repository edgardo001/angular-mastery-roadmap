// ============================================================
// gps.ts — Página de geolocalización (GPS)
// ============================================================
// Este componente usa Capacitor para acceder al GPS del dispositivo.
// Capacitor es un "puente" entre Angular y las APIs nativas del celular.
// Es como un traductor: Angular habla TypeScript, el celular habla
// Java/Swift, y Capacitor traduce entre ambos.

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';

// Geolocation: API de Capacitor para obtener la ubicación del dispositivo.
// Position: tipo de TypeScript que representa la posición (latitud, longitud, etc.).
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent],

  // template: muestra un botón para obtener la ubicación y, si se obtuvo,
  // muestra las coordenadas en una tarjeta (card).
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>GPS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- (click)="getLocation()" — cuando el usuario toca el botón, ejecuta getLocation() -->
      <ion-button expand="block" (click)="getLocation()">Get Location</ion-button>
      <!-- @if — directiva de Angular 22+ que muestra el contenido SOLO si position tiene valor -->
      @if (position) {
        <ion-card>
          <ion-card-content>
            <!-- {{ position.coords.latitude }} — interpolación: muestra el valor de la variable -->
            <p><strong>Latitude:</strong> {{ position.coords.latitude }}</p>
            <p><strong>Longitude:</strong> {{ position.coords.longitude }}</p>
            <p><strong>Accuracy:</strong> {{ position.coords.accuracy }}m</p>
          </ion-card-content>
        </ion-card>
      }
    </ion-content>
  `
})
export class GpsPage {
  // position: almacena la posición GPS. Empieza en null (sin posición).
  position: Position | null = null;

  // getLocation: función async que obtiene la posición actual.
  // "async/await" es como decir "espera a que termine esta tarea antes de seguir".
  async getLocation() {
    // getCurrentPosition(): devuelve la posición GPS del dispositivo.
    const pos = await Geolocation.getCurrentPosition();
    this.position = pos;
  }
}
