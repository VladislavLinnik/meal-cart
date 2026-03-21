import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-cart-progress',
  imports: [NgStyle],
  templateUrl: './cart-progress.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProgress {
  readonly percent = input.required<number>();

  readonly widthStyle = computed(() => ({
    width: Math.min(100, Math.max(0, this.percent())) + '%',
  }));
}
