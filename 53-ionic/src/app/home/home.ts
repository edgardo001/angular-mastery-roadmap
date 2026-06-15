import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel],
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
