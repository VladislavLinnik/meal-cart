import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../../../core/services/settings.service';
import { LANGUAGES, Settings } from '../../models/settings.model';
import { NonNullableFormControls } from '../../../../core/models/utils.model';
import { ToggleSwitchComponent } from '../../../../shared/components/toggle-switch/toggle-switch.component';
import { ThemeService } from '../../../../core/services/theme.service';
import { asGroup } from '../../../../core/utils/form.helper';
import { LangDefinition, TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, ToggleSwitchComponent, TranslocoPipe],
  templateUrl: './settings.component.html',
})
export default class SettingsComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);
  private readonly themeService = inject(ThemeService);
  private translocoService = inject(TranslocoService);

  private readonly settings: Settings | null = this.settingsService.get();
  readonly activeLang = this.translocoService.getActiveLang();
  readonly languages = this.translocoService.getAvailableLangs() as LangDefinition[];

  protected readonly asGroup = asGroup;

  form = new FormGroup<NonNullableFormControls<Settings>>({
    confirmToRemove: new FormControl(this.settings?.confirmToRemove ?? false, {
      nonNullable: true,
    }),
    darkTheme: new FormControl(this.settings?.darkTheme ?? false, { nonNullable: true }),
    language: new FormControl(this.settings?.language ?? LANGUAGES.English, { nonNullable: true }),
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.settingsService.set(this.form.getRawValue());
      this.themeService.apply(this.form.getRawValue().darkTheme);
    });

    this.form.controls.language.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((lang) => this.translocoService.setActiveLang(lang));
  }
}
