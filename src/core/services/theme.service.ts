import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isDark = signal(false);
  readonly document = inject(DOCUMENT);

  apply(isDark: boolean) {
    this.isDark.set(isDark);
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
