import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div [class.dark]="darkMode()" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header class="bg-white dark:bg-gray-800 shadow-sm">
        <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Tailwind CSS</h1>
          <button (click)="toggleDark()"
            class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            {{ darkMode() ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-4 py-8">
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of features; track item.title) {
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div class="text-3xl mb-3">{{ item.icon }}</div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">{{ item.desc }}</p>
            </div>
          }
        </section>

        <section class="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h2 class="text-3xl font-bold mb-4">Responsive & Modern</h2>
          <p class="text-blue-100 mb-6 max-w-2xl">This layout adapts from mobile to desktop using Tailwind responsive utilities. Grid columns change automatically.</p>
          <div class="flex flex-wrap gap-3">
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Flexbox</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Grid</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Dark Mode</span>
            <span class="px-3 py-1 bg-white/20 rounded-full text-sm">Signals</span>
          </div>
        </section>

        <footer class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 Tailwind CSS Angular Demo</p>
        </footer>
      </main>
    </div>
  `
})
export class App {
  darkMode = signal(false);

  features = [
    { icon: '🎨', title: 'Dark Mode', desc: 'Toggle with signals, persisted via class on root.' },
    { icon: '📱', title: 'Responsive', desc: 'Grid adapts from 1 to 2 to 3 columns across breakpoints.' },
    { icon: '⚡', title: 'Signals', desc: 'Dark mode state managed with Angular signals.' },
    { icon: '🎯', title: 'Utility First', desc: 'All styling uses Tailwind utility classes.' },
    { icon: '🌗', title: 'Theme Toggle', desc: 'Smooth transition between light and dark themes.' },
    { icon: '🧩', title: 'Modular', desc: 'Clean component architecture with standalone APIs.' }
  ];

  toggleDark() {
    this.darkMode.update(v => !v);
  }
}
