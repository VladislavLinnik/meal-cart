import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './toggle-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  readonly id = input<string>(crypto.randomUUID());
  readonly name = input<string>('');
  readonly label = input<string>();

  model = false;

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: (_: boolean) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: boolean): void {
    this.model = value;
  }
}
