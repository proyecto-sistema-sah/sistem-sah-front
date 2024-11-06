import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ISafeAny } from '../models/ISafeAny';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private readonly ERROR_MESSAGES = {
    required: 'Este campo es requerido',
    minlength: 'Este campo debe tener mínimo {minlength} caracteres',
    maxlength: 'Este campo debe tener máximo {maxlength} caracteres',
    pattern: 'El valor de este campo no es válido',
    min: 'El valor de este campo debe ser mayor o igual a {min}',
    max: 'El valor de este campo debe ser menor o igual a {max}',
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
    notSame: 'Las contraseñas no coinciden',
    fileSizeTooLarge: 'El archivo es mayor que 2 mb',
    lowPassword: 'La contraseña es muy debil'
  };

  constructor() {}

  getErrorMessages(form: FormGroup, controlName: string): string[] {
    const control: AbstractControl | null = form.get(controlName);
      
    if (control && control.invalid && control.touched) {
      const errors: string[] = [];
      for (const errorKey in control.errors) {
        if (Object.prototype.hasOwnProperty.call(control.errors, errorKey)) {
          const errorMessageTemplate = this.ERROR_MESSAGES[errorKey as keyof typeof this.ERROR_MESSAGES];
          if (errorMessageTemplate) {
            // Obtener el valor del validador para el mensaje de error
            const validatorValue = control.getError(errorKey);
            const errorMessage = this.interpolateErrorMessage(errorMessageTemplate, { [errorKey]: validatorValue });
            
            errors.push(errorMessage);
          }
        }
      }
      return errors;
    }

    return [];
  }

  private interpolateErrorMessage(errorMessageTemplate: string, errorData: ISafeAny): string {
    return errorMessageTemplate.replace(/{(\w+)}/g, (match, key) => {
      // Verificar si la propiedad necesaria está presente en errorData
      if (Object.prototype.hasOwnProperty.call(errorData, key)) {
        // Si es un objeto, intenta extraer la propiedad requiredLength
        if (typeof errorData[key] === 'object' && 'requiredLength' in errorData[key]) {
          return errorData[key]['requiredLength'];
        } else if (typeof errorData[key] === 'object' && 'min' in errorData[key]) {
          return errorData[key]['min'];
        } else if (typeof errorData[key] === 'object' && 'max' in errorData[key]) {
          return errorData[key]['max'];
        }
        return errorData[key];
      } else {
        // Si la propiedad no está presente, dejar el marcador de posición sin cambios
        return match;
      }
    });
  }
}
