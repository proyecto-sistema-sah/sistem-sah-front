import { Routes } from '@angular/router';
import { CuartosComponent } from './cuartos/cuartos.component';
import { PrincipalComponent } from './principal/principal.component';

export const INICIO_ROUTES: Routes = [
    {
        path: '',
        component: PrincipalComponent
    },
    {
        path: 'cuartos',
        component: CuartosComponent
    }
]