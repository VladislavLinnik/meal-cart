import { Component, inject, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-confirm-dialog',
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroPlus })],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
  host: {
    popover: 'manual',
  },
})
export class ConfirmDialogComponent {
  private readonly translocoService = inject(TranslocoService);

  readonly title = input<string>(this.translocoService.translate('confirmDialog.defaultTitle'));
  readonly message = input<string>(this.translocoService.translate('confirmDialog.defaultMessage'));
  readonly cancelText = input<string>(this.translocoService.translate('confirmDialog.defaultCancelText'));
  readonly confirmText = input<string>(
    this.translocoService.translate('confirmDialog.defaultConfirmText'),
  );

  readonly closed = output<void>();
  readonly action = output<void>();
}
