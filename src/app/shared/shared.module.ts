import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAllModule } from './modules/material-all.module';
import { I18nModule } from './modules/i18n.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ModifyStringPipe } from './pipes/modify-string.pipe';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ModifyStringPipe
  ],
  imports: [
    CommonModule,
    MaterialAllModule,
    HttpClientModule,
    I18nModule
  ],
  providers: [provideHttpClient()],
  exports: [MaterialAllModule, HttpClientModule, ModifyStringPipe, I18nModule],
})
export class SharedModule { }
