import { Component } from '@angular/core';
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, camera, locate } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet],
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
    addIcons({ home, camera, locate });
  }
}
