import { Component, effect, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroClipboardDocument,
  heroExclamationTriangle,
} from '@ng-icons/heroicons/outline';
import { TranslocoPipe } from '@jsverse/transloco';
import { Dish } from '../../../core/models/dish.model';
import { DishClipboardService } from '../../../core/services/dish-clipboard.service';

@Component({
  selector: 'app-copy-dishes-button',
  imports: [NgIcon, TranslocoPipe],
  viewProviders: [provideIcons({ heroCheck, heroClipboardDocument, heroExclamationTriangle })],
  templateUrl: './copy-dishes-button.component.html',
})
export class CopyDishesButtonComponent {
  readonly dishes = input.required<readonly Dish[]>();
  readonly copying = signal(false);
  readonly status = signal<'idle' | 'success' | 'error'>('idle');
  private readonly clipboardService = inject(DishClipboardService);

  constructor() {
    effect(() => {
      this.dishes();
      this.status.set('idle');
    });
  }

  async copy(): Promise<void> {
    if (this.copying() || !this.dishes().length) return;

    this.copying.set(true);
    this.status.set('idle');
    try {
      await this.clipboardService.copy(this.dishes());
      this.status.set('success');
    } catch {
      this.status.set('error');
    } finally {
      this.copying.set(false);
    }
  }
}
