import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAllModule } from './modules/material-all.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ModifyStringPipe } from './pipes/modify-string.pipe';



@NgModule({
  declarations: [
    ModifyStringPipe
  ],
  imports: [
    CommonModule,
    MaterialAllModule,
    HttpClientModule,
  ],
  providers: [provideHttpClient()],
  exports: [MaterialAllModule, HttpClientModule, ModifyStringPipe]
})
export class SharedModule { }
