import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Provider } from '@angular/core';

type URL = typeof window.URL;

export const WINDOW = new InjectionToken<Window & { URL: URL }>('windowToken');

export abstract class WindowRef {
  get nativeWindow(): Window | object {
    throw new Error('Not implemented');
  }
}

export class BrowserWindowRef extends WindowRef {
  override get nativeWindow(): Window | object {
    return window;
  }
}

export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: object): Window | object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }

  return new Object();
}

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

export const WINDOW_PROVIDERS: Provider[] = [browserWindowProvider, windowProvider];