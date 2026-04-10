import { FormControl } from '@angular/forms';

export type ValueOf<T> = T[keyof T];

export type NonNullableFormControls<T> = {
  [field in keyof T]: FormControl<T[field]>;
};
