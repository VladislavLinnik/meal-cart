import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-confirm-dialog',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroPlus })],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    popover: 'manual',
  },
})
export class ConfirmDialogComponent {
  readonly title = input<string>('Підтвердження');
  readonly message = input<string>('Підтверджуєте?');
  readonly cancelText = input<string>('Скасувати');
  readonly confirmText = input<string>('Підтвердити');

  readonly closed = output<void>();
  readonly action = output<void>();
}
