import { Component, inject, signal } from '@angular/core';
import { DatePipe, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, DecimalPipe, PercentPipe],
  template: `
    <div style="max-width:700px;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;">
      <h1 i18n="@@appTitle" style="color:#1e40af;">Localization & i18n</h1>
      <p i18n="@@appDesc">This app demonstrates Angular internationalization features.</p>

      <div style="margin:1rem 0;display:flex;gap:0.5rem;">
        <button (click)="switchLang('en')"
          style="padding:0.5rem 1rem;border-radius:4px;cursor:pointer;border:1px solid #d1d5db;background:white;">
          English
        </button>
        <button (click)="switchLang('es')"
          style="padding:0.5rem 1rem;border-radius:4px;cursor:pointer;border:1px solid #d1d5db;background:white;">
          Español
        </button>
      </div>

      <section style="margin-top:2rem;">
        <h2 i18n="@@formattersTitle">Locale-aware Formatting</h2>

        <div style="margin-top:1rem;display:grid;gap:0.75rem;">
          <p><strong i18n="@@dateLabel">Date:</strong> {{ today | date:'fullDate' }}</p>
          <p><strong i18n="@@currencyLabel">Currency:</strong> {{ 1234.56 | currency:'USD':'symbol':'1.2-2' }}</p>
          <p><strong i18n="@@numberLabel">Number:</strong> {{ 1234567.89 | number:'1.2-2' }}</p>
          <p><strong i18n="@@percentageLabel">Percentage:</strong> {{ 0.856 | percent:'1.0-2' }}</p>
        </div>
      </section>

      <section style="margin-top:2rem;">
        <h2 i18n="@@greetingLabel">Greetings</h2>
        <p>
          <span i18n="@@morning">Good morning</span>,
          <span i18n="@@welcome">welcome to our Angular i18n demo</span>!
        </p>
      </section>

      <footer style="margin-top:3rem;padding-top:1rem;border-top:1px solid #e5e7eb;">
        <p i18n="@@footerText">&copy; 2026 Angular i18n Demo. All rights reserved.</p>
      </footer>
    </div>
  `
})
export class App {
  today = Date.now();

  switchLang(locale: string) {
    window.location.href = `/${locale}/`;
  }
}
