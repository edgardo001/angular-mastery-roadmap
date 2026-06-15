import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckForUpdateService } from './check-for-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app">
      @if (updateService.updateAvailable()) {
        <div class="banner">
          New version available!
          <button (click)="updateService.activateUpdate()">Update</button>
        </div>
      }
      <header>
        <h1>PWA Notes</h1>
        <span class="status" [class.online]="online()" [class.offline]="!online()">
          {{ online() ? 'Online' : 'Offline' }}
        </span>
      </header>
      <main>
        @if (!online()) {
          <div class="offline-notice">You are offline. Changes will sync when connected.</div>
        }
        @if (showInstallPrompt()) {
          <div class="install-banner">
            Install this app for offline access!
            <button (click)="installApp()">Install</button>
            <button (click)="showInstallPrompt.set(false)">Dismiss</button>
          </div>
        }
        <div class="content">
          <p>This app works offline! Try disconnecting from the internet.</p>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app { max-width: 600px; margin: 0 auto; padding: 2rem; }
    header { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; }
    .status { font-size: 0.75rem; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
    .online { background: #dcfce7; color: #16a34a; }
    .offline { background: #fef2f2; color: #ef4444; }
    .banner, .install-banner { background: #eef2ff; color: #6366f1; padding: 0.75rem 1rem; border-radius: 8px; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
    .offline-notice { background: #fef2f2; color: #ef4444; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; }
    button { padding: 4px 12px; border: 1px solid #6366f1; background: #fff; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .content { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  `]
})
export class AppComponent implements OnInit {
  readonly updateService = inject(CheckForUpdateService);
  readonly online = signal(navigator.onLine);
  readonly showInstallPrompt = signal(false);
  private deferredPrompt: any;

  @HostListener('window:online')
  onOnline() { this.online.set(true); }

  @HostListener('window:offline')
  onOffline() { this.online.set(false); }

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallPrompt.set(true);
    });
  }

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showInstallPrompt.set(false);
      });
    }
  }
}
