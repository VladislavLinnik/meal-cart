import { DOCUMENT, inject, Service, signal } from '@angular/core';

@Service()
export class ThemeService {
  private readonly isDark = signal(false);
  readonly document = inject(DOCUMENT);

  apply(isDark: boolean) {
    this.isDark.set(isDark);
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
