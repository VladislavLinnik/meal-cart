import { AbstractControl, FormGroup } from '@angular/forms';

export function asGroup(control: AbstractControl): FormGroup {
  return control as FormGroup;
}
