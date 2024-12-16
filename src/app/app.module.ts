import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { LayoutModule } from '@angular/cdk/layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DefaultInterceptor } from '@core/interceptors/default.interceptor';
import { DatePipe } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { HeaderModule } from "./modules/header/header.module";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { I18nModule } from '@sharedModule/modules/i18n.module';
import { SharedModule } from '@sharedModule/shared.module';

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
];

export function preloadLanguages(translate: TranslateService) {
  return async () => {
    const languages = ['es', 'en']; // Idiomas soportados
    for (const lang of languages) {
      await translate.getTranslation(lang).toPromise(); // Precargar archivos de cada idioma
    }
    translate.use('es'); // Idioma por defecto
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule, // Importa solo aquí, en el módulo raíz
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    RouterModule.forRoot(APP_ROUTES),
    HeaderModule,
    TranslateModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: preloadLanguages,
      deps: [TranslateService],
      multi: true,
    },
    provideHttpClient(),
    provideAnimations(),
    ...INTERCEPTOR_PROVIDES, 
    DatePipe,
    TranslateService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


