import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>GPS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button expand="block" (click)="getLocation()">Get Location</ion-button>
      @if (position) {
        <ion-card>
          <ion-card-content>
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
  position: Position | null = null;

  async getLocation() {
    const pos = await Geolocation.getCurrentPosition();
    this.position = pos;
  }
}
