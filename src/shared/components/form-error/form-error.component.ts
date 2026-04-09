import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  imports: [],
  template: `<ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  readonly type = input.required<string>();
  readonly message = input.required<string>();
}
