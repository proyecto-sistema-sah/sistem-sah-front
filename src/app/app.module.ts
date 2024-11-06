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
import { DatePipe } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { HeaderModule } from "./modules/header/header.module";

const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },

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
    HeaderModule,
],
  providers: [
    provideHttpClient(),
    provideAnimations(),
    ...INTERCEPTOR_PROVIDES, 
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


