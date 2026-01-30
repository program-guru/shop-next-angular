import { inject, Injectable, signal, effect, Signal } from '@angular/core';
import type { Theme } from '../models/theme.model';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  private _theme = signal<Theme>(this.getInitialTheme());
  readonly theme: Signal<Theme> = this._theme.asReadonly();

  constructor() {
    effect(() => {
      const currentTheme = this._theme();
      const root = this.document.documentElement;

      if (currentTheme === 'dark') {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  private getInitialTheme(): Theme {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme') as Theme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  }

  toggleTheme(): void {
    this._theme.update((prev) => (prev === 'light' ? 'dark' : 'light'));
  }
}
