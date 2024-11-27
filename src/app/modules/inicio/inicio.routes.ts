import { Routes } from '@angular/router';
import { CuartosComponent } from './cuartos/cuartos.component';
import { PrincipalComponent } from './principal/principal.component';
import { GastronomiaComponent } from './gastronomia/gastronomia.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ComprasComponent } from './compras/compras.component';
import { FacturacionComponent } from './facturacion/facturacion.component';

/**
 * Definición de rutas para el módulo "Inicio".
 * Maneja la navegación dentro de la sección principal de la aplicación.
 */
export const INICIO_ROUTES: Routes = [
  {
    path: '',
    component: PrincipalComponent, // Página principal
  },
  {
    path: 'cuartos',
    component: CuartosComponent, // Página de cuartos
  },
  {
    path: 'cuartos/:id',
    component: CuartosComponent, // Página de cuartos específicos
  },
  {
    path: 'compras',
    component: ComprasComponent, // Página de compras
  },
  {
    path: 'gastronomia',
    component: GastronomiaComponent, // Página de gastronomía
  },
  {
    path: 'servicio',
    component: ServicioComponent, // Página de servicios
  },
  {
    path: 'facturacion',
    component: FacturacionComponent, // Página de facturación
  },
];
