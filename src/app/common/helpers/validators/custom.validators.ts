import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador personalizado para verificar si el valor de un control coincide con un patrón específico.
 *
 * @param regex Expresión regular que define el patrón a validar.
 * @param error Objeto de errores que se debe retornar si la validación falla.
 * @returns Una función de validación (`ValidatorFn`) que valida el valor del control y retorna los errores o `null` si es válido.
 */
export function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Si el control no tiene un valor, no se realiza la validación (útil para validaciones condicionales).
    if (!control.value) {
      return null;
    }

    // Evalúa si el valor del control cumple con el patrón especificado.
    const isValid = regex.test(control.value);

    // Retorna `null` si es válido o el objeto de error si no lo es.
    return isValid ? null : error;
  };
}
