import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { DefaultInterceptor } from '@core/interceptors/default.interceptor';
import { HttpRequestMockInterceptorService } from '@core/interceptors/http-request-mock-interceptor.service';
import { DatePipe } from '@angular/common';
import { environment } from '@env/environment';
import { CoreModule } from '@core/core.module';

const INTERCEPTOR_PROVIDES = [{ provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }];

const PROVIDES_DESARROLLO: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestMockInterceptorService, multi: true },
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [
    provideHttpClient(),
    provideAnimations(),
    ...INTERCEPTOR_PROVIDES, 
    DatePipe, 
    !environment.production ? PROVIDES_DESARROLLO : []
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideAnimationsAsync(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

