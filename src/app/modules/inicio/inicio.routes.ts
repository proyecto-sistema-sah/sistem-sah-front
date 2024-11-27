import { Routes } from '@angular/router';
import { CuartosComponent } from './cuartos/cuartos.component';
import { PrincipalComponent } from './principal/principal.component';
import { GastronomiaComponent } from './gastronomia/gastronomia.component';
import { ServicioComponent } from './servicio/servicio.component';

export const INICIO_ROUTES: Routes = [
    {
        path: '',
        component: PrincipalComponent
    },
    {
        path: 'cuartos',
        component: CuartosComponent
    },
    {
        path: 'cuartos/:id',
        component: CuartosComponent
    },
    {
        path: 'gastronomia',
        component: GastronomiaComponent
    },
    {
        path: 'servicio',
        component: ServicioComponent
    }
]