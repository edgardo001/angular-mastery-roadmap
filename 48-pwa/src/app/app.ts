import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PushNotificationService } from './push-notification.service';
import { CheckForUpdateService } from './check-for-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app">
      <header class="header">
        <h1>PWA Notes</h1>
        <div class="status">
          <span [class.online]="isOnline()" [class.offline]="!isOnline()">
            {{ isOnline() ? 'Online' : 'Offline' }}
          </span>
          @if (pushSupported()) {
            <button (click)="subscribePush()" class="btn-push">
              {{ isSubscribed() ? 'Push Activado' : 'Activar notificaciones' }}
            </button>
          }
        </div>
      </header>

      <main>
        <router-outlet />
      </main>

      <!-- Banner de actualizacion -->
      @if (updateService.updateAvailable()) {
        <div class="update-banner">
          <p>Nueva version disponible</p>
          <button (click)="updateService.activateUpdate()">Actualizar</button>
        </div>
      }

      <!-- Banner de instalacion -->
      @if (showInstall()) {
        <div class="install-banner">
          <p>Instalar esta app en tu dispositivo</p>
          <button (click)="installPWA()">Instalar</button>
          <button (click)="showInstall.set(false)" class="btn-dismiss">X</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .app { min-height: 100vh; background: #f5f5f5; }
    .header { background: #1a1a2e; color: white; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
    .status { display: flex; gap: 15px; align-items: center; }
    .online { color: #4caf50; }
    .offline { color: #f44336; }
    .btn-push { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .update-banner { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background: #1a73e8; color: white; padding: 15px 25px; border-radius: 12px; display: flex; gap: 15px; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000; }
    .update-banner button { background: white; color: #1a73e8; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .install-banner { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #16213e; color: white; padding: 15px 25px; border-radius: 12px; display: flex; gap: 15px; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000; }
    .install-banner button { background: #1a73e8; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .btn-dismiss { background: rgba(255,255,255,0.2) !important; }
  `],
})
export class AppComponent implements OnInit {
  private pushService = inject(PushNotificationService);
  readonly updateService = inject(CheckForUpdateService);

  isOnline = signal(navigator.onLine);
  showInstall = signal(false);
  isSubscribed = signal(false);
  private deferredPrompt: any;

  pushSupported() {
    return this.pushService.isPushSupported();
  }

  ngOnInit() {
    window.addEventListener('online', () => this.isOnline.set(true));
    window.addEventListener('offline', () => this.isOnline.set(false));

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstall.set(true);
    });
  }

  async subscribePush() {
    const granted = await this.pushService.requestPermission();
    if (granted) {
      await this.pushService.subscribeToPush();
      this.isSubscribed.set(true);
    }
  }

  async installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      await this.deferredPrompt.userChoice;
      this.showInstall.set(false);
    }
  }
}
