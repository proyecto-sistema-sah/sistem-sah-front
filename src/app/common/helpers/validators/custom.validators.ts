import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function patternValidator(regex: RegExp, error: ValidationErrors) {
  const pattern: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);

    return valid ? null : error;
  };

  return pattern;
}
