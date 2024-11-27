import { APP_ERRORS } from './http-constants';

/**
 * Clase `HttpError`
 * Representa un error HTTP con propiedades para el código, título y mensaje descriptivo.
 * Proporciona métodos para inicializar errores a partir de códigos predefinidos.
 */
export class HttpError {
  /**
   * Código del error.
   * Identifica de manera única el tipo de error.
   */
  private _code!: string;

  /**
   * Obtiene el código del error.
   */
  get code(): string {
    return this._code;
  }

  /**
   * Establece el código del error.
   */
  set code(value: string) {
    this._code = value;
  }

  /**
   * Título del error.
   * Proporciona una descripción breve del error.
   */
  private _title!: string;

  /**
   * Obtiene el título del error.
   */
  get title(): string {
    return this._title;
  }

  /**
   * Establece el título del error.
   */
  set title(value: string) {
    this._title = value;
  }

  /**
   * Mensaje del error.
   * Ofrece una descripción detallada del error.
   */
  private _message!: string;

  /**
   * Obtiene el mensaje del error.
   */
  get message(): string {
    return this._message;
  }

  /**
   * Establece el mensaje del error.
   */
  set message(value: string) {
    this._message = value;
  }

  /**
   * Inicializa un objeto `HttpError` con un código de error.
   * Si el código corresponde a un error definido en `APP_ERRORS`, se asignan su título y mensaje.
   * Si no se encuentra el código, los campos `title` y `message` permanecen vacíos.
   *
   * @param code Código del error, o `null` si no está disponible.
   * @returns Una instancia de `HttpError`.
   */
  public static initWithCode(code: string | null): HttpError {
    const httpError = new HttpError();

    // Asigna el código del error, o una cadena vacía si el código es `null`.
    httpError.code = code ?? '';

    // Busca el error en `APP_ERRORS` usando el código proporcionado.
    const appError = APP_ERRORS.find((item) => item.code === code);
    if (appError) {
      httpError.title = appError.title; // Asigna el título si se encuentra.
      httpError.message = appError.message; // Asigna el mensaje si se encuentra.
    }

    return httpError;
  }
}
