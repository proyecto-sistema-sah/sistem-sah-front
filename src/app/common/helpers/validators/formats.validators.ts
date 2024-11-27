import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador para correos electrónicos.
 * Verifica si el valor de un control cumple con el formato de un correo electrónico válido.
 *
 * @param control Control de formulario que contiene el valor a validar.
 * @returns Un objeto de error con la clave `email` si la validación falla, o `null` si es válido.
 */
export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const emailPattern =
    /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;

  return emailPattern.test(control.value) ? null : { email: true };
}

/**
 * Validador para contraseñas seguras.
 * Verifica si el valor de un control cumple con los siguientes requisitos:
 * - Al menos una letra minúscula.
 * - Al menos una letra mayúscula.
 * - Al menos un dígito.
 * - Al menos un carácter especial.
 * - Longitud mínima de 8 caracteres.
 *
 * @param control Control de formulario que contiene el valor a validar.
 * @returns Un objeto de error con la clave `lowPassword` si la validación falla, o `null` si es válido.
 */
export function strongPassword(control: AbstractControl): ValidationErrors | null {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&\W]{8,}$/i;

  return passwordPattern.test(control.value) ? null : { lowPassword: true };
}

/**
 * Validador para el tamaño de archivos.
 * Verifica si el archivo seleccionado tiene un tamaño menor o igual al tamaño máximo permitido.
 *
 * @param control Control de formulario que contiene el archivo a validar.
 * @returns Un objeto de error con la clave `fileSizeTooLarge` si el archivo es demasiado grande, o `null` si es válido.
 */
export function sizeFileSelect(control: AbstractControl): ValidationErrors | null {
  const file = control.value as File;

  if (file) {
    const maxSizeInMB = 2; // Tamaño máximo permitido en MB
    const fileSizeInMB = file.size / (1024 * 1024); // Convertir tamaño del archivo a MB

    return fileSizeInMB > maxSizeInMB ? { fileSizeTooLarge: true } : null;
  }

  return null; // No hay error si no hay archivo o si el archivo es válido
}
