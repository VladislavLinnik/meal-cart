import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
} from '@angular/core';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SettingsService } from './settings.service';
import { ConfirmConfig } from '../models/confirm-dialog.model';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private settingsService = inject(SettingsService);

  confirm(config: ConfirmConfig & { onConfirm: () => void }): void {
    const settings = this.settingsService.get();
    if (!settings?.confirmToRemove) {
      config.onConfirm();
      return;
    }

    const ref = createComponent(ConfirmDialogComponent, {
      environmentInjector: this.injector,
    });

    ref.setInput('title', config.title ?? 'Підтвердження');
    ref.setInput('message', config.message ?? 'Підтверджуєте?');
    ref.setInput('confirmText', config.confirmText ?? 'Підтвердити');
    ref.setInput('cancelText', config.cancelText ?? 'Скасувати');

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
