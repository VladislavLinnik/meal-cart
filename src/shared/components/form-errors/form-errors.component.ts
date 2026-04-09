import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorComponent } from '../form-error/form-error.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, map, merge, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent {
  readonly field = input.required<AbstractControl | null>();
  readonly formErrors = contentChildren(FormErrorComponent);

  readonly message = toSignal(
    toObservable(this.field).pipe(
      switchMap((c) => (c ? merge(of(null), c.events) : EMPTY)),
      map(() => {
        const control = this.field();
        if (!control?.errors || (!control.touched && !control.dirty)) return null;

        return this.formErrors().find((e) => control.errors![e.type()])?.message();
      }),
    ),
  );
}
