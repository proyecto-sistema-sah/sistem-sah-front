import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

const urls = [
  {
    url: new RegExp(`${environment.baseUrlAPI}${environment.api.getExample}`, 'i'),
    mockPath: '/assets/mocks/get-params.json',
  },
];

@Injectable()
export class HttpRequestMockInterceptorService implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  env: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.mocks) {
      for (const element of urls) {
        if (element.url.test(request.url)) {
          switch (request.method) {
            case 'GET':
              return next.handle(
                request.clone({
                  url: element.mockPath,
                })
              );
            // TODO
            // case 'POST':
            //   return of(new HttpResponse({ status: 201, body: (element.postResponse as any).default }));
            // case 'DELETE':
            //   return of(new HttpResponse({ status: 200, body: (element.deleteResponse as any).default }));
            // case 'PUT':
            //   return of(new HttpResponse({ status: 200, body: (element.putResponse as any).default }));
          }
        }
      }
    }

    return next.handle(request);
  }
}
