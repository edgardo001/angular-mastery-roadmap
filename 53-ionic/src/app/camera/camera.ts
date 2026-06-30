// ============================================================
// camera.ts — Página de cámara
// ============================================================
// Este componente usa Capacitor para acceder a la cámara del dispositivo.
// Es como tomar una foto con tu app, pero usando código web.

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg } from '@ionic/angular/standalone';

// Camera: API de Capacitor para acceder a la cámara.
// CameraResultType: define en qué formato devuelve la foto (base64, DataUrl, etc.).
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonImg],

  // template: botón para tomar foto y, si se tomó, la muestra con ion-img.
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="block" (click)="takePhoto()">Take Photo</ion-button>
      @if (photo) {
        <!-- [src]="photo" — binding: le pasa el valor de photo al atributo src -->
        <ion-img [src]="photo" alt="Captured photo"></ion-img>
      }
    </ion-content>
  `
})
export class CameraPage {
  // photo: almacena la foto tomada como string (DataUrl en base64).
  photo: string | undefined;

  // takePhoto: abre la cámara del dispositivo y guarda la foto.
  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,           // Calidad de la imagen (0-100)
      allowEditing: false,   // No permitir editar antes de guardar
      resultType: CameraResultType.DataUrl // Formato: data:image/jpeg;base64,...
    });
    this.photo = image.dataUrl;
  }
}
