import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAllModule } from './modules/material-all.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialAllModule,
    HttpClientModule,
  ],
  providers: [provideHttpClient()],
  exports: [MaterialAllModule, HttpClientModule]
})
export class SharedModule { }
