import { AbstractControl } from '@angular/forms';

export const getFormControlError = (formControl: AbstractControl): string => {
  if (!formControl.errors) return '';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const firstErrorKey = Object.keys(formControl.errors!)[0];

  return formControl.errors?.[firstErrorKey] || '';
};
