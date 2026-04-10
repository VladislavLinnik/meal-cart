import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../../../core/services/settings.service';
import { Settings } from '../../models/settings.model';
import { NonNullableFormControls } from '../../../../core/models/utils.model';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, ToggleSwitchComponent],
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);
  private readonly themeService = inject(ThemeService);

  private readonly settings: Settings | null = this.settingsService.get();

  form = new FormGroup<NonNullableFormControls<Settings>>({
    confirmToRemove: new FormControl(this.settings?.confirmToRemove ?? false, {
      nonNullable: true,
    }),
    darkTheme: new FormControl(this.settings?.darkTheme ?? false, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.settingsService.set(this.form.getRawValue());
      this.themeService.apply(this.form.getRawValue().darkTheme);
    });
  }
}
