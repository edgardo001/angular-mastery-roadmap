import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';
import { effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface ThemeState {
  darkMode: boolean;
}

const THEME_KEY = 'ngrx-theme';

export const ThemeStore = signalStore(
  { providedIn: 'root' },

  withState<ThemeState>({
    darkMode: false,
  }),

  withMethods((store) => ({
    toggle() {
      patchState(store, { darkMode: !store.darkMode() });
    },
  })),

  withHooks({
    onInit(store) {
      const doc = inject(DOCUMENT);
      const saved = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const darkMode = saved !== null ? saved === 'true' : prefersDark;
      patchState(store, { darkMode });

      effect(() => {
        doc.body.classList.toggle('dark', store.darkMode());
        localStorage.setItem(THEME_KEY, String(store.darkMode()));
      });
    },
  })
);
