import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Service,
} from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SettingsService } from './settings.service';
import { ConfirmConfig } from '../models/confirm-dialog.model';

@Service()
export class ConfirmDialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private settingsService = inject(SettingsService);
  private translocoService = inject(TranslocoService);

  confirm(config: ConfirmConfig & { onConfirm: () => void }): void {
    const settings = this.settingsService.get();
    if (!settings?.confirmToRemove) {
      config.onConfirm();
      return;
    }

    const ref = createComponent(ConfirmDialogComponent, {
      environmentInjector: this.injector,
    });

    ref.setInput('title', config.title ?? this.translocoService.translate('confirmDialog.defaultTitle'));
    ref.setInput(
      'message',
      config.message ?? this.translocoService.translate('confirmDialog.defaultMessage'),
    );
    ref.setInput(
      'confirmText',
      config.confirmText ?? this.translocoService.translate('confirmDialog.defaultConfirmText'),
    );
    ref.setInput(
      'cancelText',
      config.cancelText ?? this.translocoService.translate('confirmDialog.defaultCancelText'),
    );

    const element = ref.location.nativeElement as HTMLElement;

    const clean = () => {
      actionSub.unsubscribe();
      closedSub.unsubscribe();
      element.hidePopover();
      ref.destroy();
    };

    const actionSub = ref.instance.action.subscribe(() => {
      clean();
      config.onConfirm();
    });

    const closedSub = ref.instance.closed.subscribe(() => clean());

    this.appRef.attachView(ref.hostView);
    document.body.appendChild(element);
    element.showPopover();
  }
}
