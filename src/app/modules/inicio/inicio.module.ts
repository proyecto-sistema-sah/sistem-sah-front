import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { INICIO_ROUTES } from './inicio.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@sharedModule/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(INICIO_ROUTES),
    HeaderModule
  ],
  providers: [ ErrorHandlerService, UtilitiesService]
})
export class InicioModule { }
