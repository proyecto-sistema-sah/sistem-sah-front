import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

/**
 * Define un token de inyección para proporcionar acceso a la ventana del navegador (`window`) y su propiedad `URL`.
 */
export const WINDOW = new InjectionToken<Window & { URL: URL }>('windowToken');

/**
 * Clase abstracta `WindowRef`.
 * Proporciona una interfaz para acceder al objeto `window`.
 * Esta clase debe ser implementada para plataformas específicas.
 */
export abstract class WindowRef {
  /**
   * Obtiene una referencia al objeto `window`.
   * Si no se implementa, lanza un error indicando que no está disponible.
   */
  get nativeWindow(): Window | object {
    throw new Error('Not implemented');
  }
}

/**
 * Implementación de `WindowRef` para plataformas basadas en el navegador.
 * Retorna el objeto global `window` si está disponible.
 */
export class BrowserWindowRef extends WindowRef {
  override get nativeWindow(): Window | object {
    return window;
  }
}

/**
 * Fábrica para proporcionar el objeto `window` basado en la plataforma actual.
 * Si la plataforma es el navegador, retorna el objeto `window`.
 * Si no es el navegador, retorna un objeto vacío.
 *
 * @param browserWindowRef Instancia de `BrowserWindowRef` para acceder al objeto `window`.
 * @param platformId Identificador de la plataforma actual.
 * @returns El objeto `window` si está disponible, de lo contrario un objeto vacío.
 */
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: object): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return {}; // Retorna un objeto vacío para plataformas no basadas en navegador.
}

/**
 * Proveedor de clase para `WindowRef`, que utiliza `BrowserWindowRef` como implementación.
 */
const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

/**
 * Proveedor de fábrica para el token `WINDOW`.
 * Utiliza `windowFactory` para determinar si se debe inyectar el objeto `window` o un objeto vacío.
 */
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

/**
 * Exporta un conjunto de proveedores para configurar el acceso al objeto `window`.
 * Incluye:
 * - `browserWindowProvider`: Proveedor para la clase `WindowRef`.
 * - `windowProvider`: Proveedor para el token `WINDOW` basado en la fábrica.
 */
export const WINDOW_PROVIDERS: Provider[] = [browserWindowProvider, windowProvider];
