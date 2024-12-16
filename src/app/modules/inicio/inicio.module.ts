import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { INICIO_ROUTES } from './inicio.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@sharedModule/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { CuartosComponent } from './cuartos/cuartos.component';
import { PrincipalComponent } from './principal/principal.component';
import { GastronomiaComponent } from './gastronomia/gastronomia.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ComprasComponent } from './compras/compras.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Módulo principal para la funcionalidad de "Inicio".
 * Contiene los componentes y rutas relacionados con la navegación principal de la aplicación.
 */
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    HeaderModule,
    TranslateModule,
    FormsModule,
    RouterModule.forChild(INICIO_ROUTES), // Lazy loading de rutas
  ],
  declarations: [
    InicioComponent,
    CuartosComponent,
    FacturacionComponent,
    PrincipalComponent,
    GastronomiaComponent,
    ComprasComponent,
    ServicioComponent,
  ],
  providers: [ErrorHandlerService, UtilitiesService],
})
export class InicioModule {}
