import { inject } from '@angular/core';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { ConfirmConfig } from '../models/confirm-dialog.model';
import { SettingsService } from '../services/settings.service';

export function injectConfirmChecker() {
  const confirmDialogService = inject(ConfirmDialogService);
  const settingsService = inject(SettingsService);

  return (action: () => void, config?: ConfirmConfig) => {
    if (settingsService.get()?.confirmToRemove) {
      confirmDialogService.confirm({ ...config, onConfirm: action });
    } else {
      action();
    }
  };
}
