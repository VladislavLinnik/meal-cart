import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../core/layout/header/header.component';
import { SettingsService } from '../core/services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly settingsService = inject(SettingsService);

  @HostBinding('class.dark') isDark = false;

  constructor() {
    this.isDark = this.settingsService.isDarkMode();
  }
}
