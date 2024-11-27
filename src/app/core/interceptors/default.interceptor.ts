import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, finalize, map, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { HttpError } from '@core/models/http-error';

/**
 * Tiempo límite para las solicitudes HTTP en milisegundos.
 */
const APP_XHR_TIMEOUT = 120000;

/**
 * Interceptor HTTP predeterminado que maneja:
 * - La configuración de encabezados.
 * - Manejo de errores.
 * - Adición de tokens de autorización.
 * - Configuración de URLs completas.
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private utilitiesService: UtilitiesService) {}

  /**
   * Intercepta las solicitudes HTTP y aplica personalizaciones como encabezados, manejo de errores y tiempo límite.
   * @param req Solicitud HTTP original.
   * @param next Manejador HTTP que envía la solicitud al siguiente interceptor o al servidor.
   * @returns Un observable que emite eventos HTTP.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.performRequest(req)).pipe(
      timeout(APP_XHR_TIMEOUT),
      map((res) => this.handleSuccessfulResponse(res)),
      catchError((err) => this.handleErrorResponse(err)),
      finalize(() => this.handleRequestCompleted())
    );
  }

  /**
   * Realiza ajustes en la solicitud antes de enviarla.
   * @param req Solicitud HTTP original.
   * @returns Una nueva solicitud HTTP con URL y encabezados actualizados.
   */
  private performRequest(req: HttpRequest<ISafeAny>): HttpRequest<ISafeAny> {
    const headers = this.getUpdatedHeaders(req.headers);
    const url = this.getFullUrl(req.url);

    return req.clone({ url, setHeaders: headers });
  }

  /**
   * Actualiza los encabezados de la solicitud, incluyendo el token de autorización si está disponible.
   * @param headers Encabezados originales de la solicitud.
   * @returns Encabezados actualizados.
   */
  private getUpdatedHeaders(headers: HttpHeaders): { [name: string]: string } {
    const token = sessionStorage.getItem('userToken');
    const updatedHeaders: { [name: string]: string } = {};

    if (token) {
      updatedHeaders['Authorization'] = `Bearer ${token}`;
    }

    return updatedHeaders;
  }

  /**
   * Convierte URLs relativas a URLs completas basadas en el `baseUrl` del entorno.
   * @param url URL original de la solicitud.
   * @returns URL completa.
   */
  private getFullUrl(url: string): string {
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      const { baseUrl } = environment.api;
      return `${baseUrl}${url.startsWith('/') ? url.substring(1) : url}`;
    }
    return url;
  }

  /**
   * Maneja las respuestas exitosas de las solicitudes HTTP.
   * @param event Evento HTTP.
   * @returns Una respuesta HTTP modificada o el evento original.
   */
  private handleSuccessfulResponse(event: ISafeAny): HttpResponse<ISafeAny> {
    if (event instanceof HttpResponse) {
      // Si la respuesta incluye un token, se guarda en el sessionStorage
      if (event.body?.data?.token) {
        sessionStorage.setItem('userToken', event.body.data.token);
      }

      // Modifica la respuesta para devolver solo el cuerpo interno si existe
      return event.clone({ body: event.body?.response });
    }

    return event;
  }

  /**
   * Maneja los errores de las solicitudes HTTP, incluyendo errores de tiempo de espera.
   * @param errorResponse Respuesta de error recibida.
   * @returns Un observable que lanza un error personalizado.
   */
  private handleErrorResponse(errorResponse: ISafeAny): Observable<HttpEvent<ISafeAny>> {
    if (errorResponse instanceof TimeoutError) {
      return throwError(() => new Error('Timeout Exception'));
    }

    switch (errorResponse.status) {
      case 401:
        this.handleSessionExpired();
        return throwError(() => this.getCustomError(errorResponse));
      case 404:
      case 500:
        return throwError(() => this.getCustomError(errorResponse));
      default:
        return throwError(() => this.getCustomError(errorResponse));
    }
  }

  /**
   * Maneja el caso en que la sesión del usuario ha expirado, limpiando el sessionStorage.
   */
  private handleSessionExpired(): void {
    sessionStorage.clear();
  }

  /**
   * Genera un error personalizado basado en la respuesta de error recibida.
   * @param errorResponse Respuesta de error recibida.
   * @returns Un objeto `HttpError` con los detalles del error.
   */
  private getCustomError(errorResponse: ISafeAny): HttpError {
    let customError = new HttpError();
    try {
      console.error(errorResponse);
      const error = errorResponse?.error;
      customError = HttpError.initWithCode(String(error?.status || 'UNKNOWN'));
    } catch (e) {
      console.error('Error parsing custom error:', e);
    }
    return customError;
  }

  /**
   * Maneja la finalización de una solicitud HTTP (independientemente del éxito o fracaso).
   */
  private handleRequestCompleted(): void {
    console.log('Request finished');
  }
}
