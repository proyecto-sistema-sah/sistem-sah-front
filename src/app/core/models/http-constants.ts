/**
 * Constantes de código de error.
 * Estas constantes representan diferentes tipos de errores que pueden ocurrir en la aplicación.
 */
export const ERROR_VALIDATE_EMAIL_PROVIDER = 'ERROR_VALIDATE_EMAIL_PROVIDER';
export const EMAIL_NOTIFICATION_NOT_FOUND = 'EMAIL_NOTIFICATION_NOT_FOUND';
export const MAIL_NOT_FOUND = 'MAIL_NOT_FOUND';
export const CODE_NOT_VALID = 'CODE_NOT_VALID';
export const BAD_CREDENTIAL = 'BAD_CREDENTIAL';
export const USER_ALREADY_EXIST = 'USER_ALREADY_EXIST';
export const UNAUTHORIZED = 'UNAUTHORIZED';

/**
 * Colección de errores de la aplicación.
 * Cada objeto en esta lista representa un tipo específico de error con su código, título y mensaje descriptivo.
 */
export const APP_ERRORS = [
  {
    code: ERROR_VALIDATE_EMAIL_PROVIDER,
    title: 'Error de Validación del Proveedor de Email',
    message: 'El email proporcionado no existe. Por favor, verifique.',
  },
  {
    code: UNAUTHORIZED,
    title: 'No Autorizado',
    message: 'Error en las credenciales, por favor rectifique.',
  },
  {
    code: EMAIL_NOTIFICATION_NOT_FOUND,
    title: 'Notificación de Email No Encontrada',
    message: 'El email y el código de notificación no fueron encontrados.',
  },
  {
    code: MAIL_NOT_FOUND,
    title: 'Correo Electrónico No Encontrado',
    message: 'No se encontró el correo electrónico proporcionado.',
  },
  {
    code: CODE_NOT_VALID,
    title: 'Código No Válido',
    message: 'El código ingresado no es válido. Por favor, inténtelo nuevamente.',
  },
  {
    code: BAD_CREDENTIAL,
    title: 'Credenciales Incorrectas',
    message: 'Las credenciales proporcionadas son incorrectas.',
  },
  {
    code: USER_ALREADY_EXIST,
    title: 'Usuario Ya Existente',
    message: 'El usuario ya existe en el sistema.',
  },
];
