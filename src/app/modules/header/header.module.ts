import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@sharedModule/shared.module';
import { RouterModule } from '@angular/router';

/**
 * Módulo encargado de gestionar el componente de cabecera.
 */
@NgModule({
  declarations: [
    HeaderComponent // Declaración del componente de cabecera
  ],
  imports: [
    SharedModule,   // Módulo compartido
    CommonModule,   // Funcionalidades comunes de Angular
    RouterModule    // Soporte para navegación en rutas
  ],
  providers: [], // Los servicios necesarios son proporcionados directamente en los componentes
  exports: [HeaderComponent] // Exportar el componente para uso en otros módulos
})
export class HeaderModule {}
