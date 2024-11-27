import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WINDOW_PROVIDERS } from './providers/window.provider';

/**
 * Módulo central (`CoreModule`) que configura y proporciona servicios o utilidades
 * compartidas en toda la aplicación.
 *
 * Este módulo no debe ser importado directamente en módulos de características (feature modules).
 * En su lugar, debe ser importado solo una vez en el `AppModule`.
 */
@NgModule({
  imports: [
    CommonModule, // Proporciona directivas y servicios comunes de Angular (ngIf, ngFor, etc.).
  ],
  providers: [
    WINDOW_PROVIDERS, // Registra los proveedores necesarios para el manejo del objeto `window`.
  ],
})
export class CoreModule {}
