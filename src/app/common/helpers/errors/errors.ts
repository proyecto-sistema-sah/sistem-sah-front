export const DEFAULT_ERROR_MESSAGE = 'El valor de este campo no es válido';

export const ERROR_MESSAGES = {
  required: 'Este campo es requerido',
  minlength: 'Este campo debe tener mínimo { minlength.requiredLength } caracteres',
  maxlength: 'Este campo debe tener máximo { maxlength.requiredLength } caracteres',
  pattern: 'El valor de este campo no es válido',
  min: 'El valor de este campo debe ser mayor o igual a { min.min }',
  max: 'El valor de este campo debe ser menor o igual a { max.max }',
  telBetweenDigits:
    'El número de telefono debe tener entre { telBetweenDigits.min } y { telBetweenDigits.max } dígitos',
  maxExpenses: 'El valor de este campo debe ser menor o igual a { max.max }',
  phoneDigits: 'Tu número de teléfono debe tener { phoneDigits.digits } dígitos',
  isNaN: 'El valor de este campo debe ser numérico',
  fullName: 'Debes ingresar un nombre válido',
  minCurrency: 'El valor de este campo debe ser mayor a $ { minCurrency.min }',
  maxCurrency: 'El valor de este campo debe ser menor a $ { maxCurrency.max }',
  maxAdvance: 'El valor no puede exceder tu disponible para avances ($ { maxAdvance.max })',
  isMultiple: 'El valor no es múltiplo de $ { isMultiple.multiple }',
  email: 'El valor debe ser un email válido',
  betweenAge: 'Debes tener entre { betweenAge.min } y { betweenAge.max } años',
  validAddress: 'Debes ingresar una dirección válida',
  noPasswordMatch: 'Las contraseñas no coinciden',
  alphanumeric: 'No se permiten carácteres especiales, sólo el guión (-)',
  onlyNumbers: 'Solo se permiten valores numéricos en este campo',
  onlyLetters: 'Solo se permiten letras en este campo',
  hasCapitalCase: 'Este campo debe contener mayúsculas',
  hasSmallCase: 'Este campo debe contener minúsculas',
  hasSpecialCharacters: 'Este campo debe contener carácteres especiales',
};

import { AbstractControl, FormGroup } from '@angular/forms';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

// Ajustamos la firma de la función para que reciba el formulario y el nombre del control
export function getErrorMessages(form: FormGroup, controlName: string): string[] {
  const control: AbstractControl | null = form.get(controlName);

  if (control && control.invalid && control.touched) {
    const errors: string[] = [];

    // Iteramos sobre las claves de los errores del control
    for (const errorKey in control.errors) {
      if (Object.prototype.hasOwnProperty.call(control.errors, errorKey)) {
        // Accedemos al mensaje de error correspondiente a la clave actual
        const errorMessageTemplate = ERROR_MESSAGES[errorKey as keyof typeof ERROR_MESSAGES];
        if (errorMessageTemplate) {
          // Interpolamos el mensaje de error y lo añadimos al array de errores
          errors.push(interpolateErrorMessage(errorMessageTemplate, control.errors[errorKey]));
        }
      }
    }

    return errors;
  }

  return [];
}

function interpolateErrorMessage(errorMessageTemplate: string, errorData: ISafeAny): string {
  return errorMessageTemplate.replace(/{\s*(\w+)\s*}/g, (match, capture) => {
    return errorData[capture] || match;
  });
}