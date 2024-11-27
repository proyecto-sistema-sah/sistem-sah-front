// Mensaje de error por defecto para validaciones genéricas
export const DEFAULT_ERROR_MESSAGE = 'El valor de este campo no es válido';

/**
 * Mapeo de mensajes de error para diferentes tipos de validaciones.
 * Cada clave corresponde a un nombre de error que puede generarse en un formulario reactivo.
 * Los valores son plantillas que pueden incluir placeholders para datos dinámicos.
 */
export const ERROR_MESSAGES = {
  required: 'Este campo es requerido',
  minlength: 'Este campo debe tener mínimo { minlength.requiredLength } caracteres',
  maxlength: 'Este campo debe tener máximo { maxlength.requiredLength } caracteres',
  pattern: 'El valor de este campo no es válido',
  min: 'El valor de este campo debe ser mayor o igual a { min.min }',
  max: 'El valor de este campo debe ser menor o igual a { max.max }',
  telBetweenDigits: 'El número de teléfono debe tener entre { telBetweenDigits.min } y { telBetweenDigits.max } dígitos',
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
  alphanumeric: 'No se permiten caracteres especiales, sólo el guión (-)',
  onlyNumbers: 'Solo se permiten valores numéricos en este campo',
  onlyLetters: 'Solo se permiten letras en este campo',
  hasCapitalCase: 'Este campo debe contener mayúsculas',
  hasSmallCase: 'Este campo debe contener minúsculas',
  hasSpecialCharacters: 'Este campo debe contener caracteres especiales',
  size: 'El archivo es mayor que 2 mb',
  lowPassword: 'La contraseña es muy débil',
};

import { AbstractControl, FormGroup } from '@angular/forms';
import { ISafeAny } from '@sharedModule/models/ISafeAny';

/**
 * Obtiene los mensajes de error para un control específico dentro de un formulario reactivo.
 *
 * @param form El formulario reactivo que contiene el control.
 * @param controlName El nombre del control en el formulario.
 * @returns Un array de mensajes de error generados para el control.
 */
export function getErrorMessages(form: FormGroup, controlName: string): string[] {
  const control: AbstractControl | null = form.get(controlName);
  console.log(control);

  if (control && control.invalid && control.touched) {
    const errors: string[] = [];

    // Itera sobre las claves de los errores asociados al control
    for (const errorKey in control.errors) {
      if (Object.prototype.hasOwnProperty.call(control.errors, errorKey)) {
        // Obtiene la plantilla del mensaje de error correspondiente
        const errorMessageTemplate = ERROR_MESSAGES[errorKey as keyof typeof ERROR_MESSAGES];
        if (errorMessageTemplate) {
          // Interpola los datos dinámicos en el mensaje de error
          errors.push(interpolateErrorMessage(errorMessageTemplate, control.errors[errorKey]));
        }
      }
    }

    return errors;
  }

  return [];
}

/**
 * Interpola los placeholders en una plantilla de mensaje de error con los valores correspondientes.
 *
 * @param errorMessageTemplate La plantilla del mensaje de error, que puede contener placeholders en el formato `{ clave }`.
 * @param errorData Un objeto que contiene los valores para reemplazar los placeholders.
 * @returns El mensaje de error con los valores interpolados.
 */
function interpolateErrorMessage(errorMessageTemplate: string, errorData: ISafeAny): string {
  return errorMessageTemplate.replace(/{\s*(\w+)\s*}/g, (match, capture) => {
    return errorData[capture] || match;
  });
}
