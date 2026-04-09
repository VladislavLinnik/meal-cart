import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-dialog',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroPlus })],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.id]': 'null',
  },
})
export class DialogComponent {
  readonly id = input<string>('');
  readonly title = input<string>('');
  readonly cancelText = input<string>('Скасувати');
  readonly confirmText = input<string>('Підтвердити');

  readonly closed = output<void>();
  readonly action = output<void>();
}
