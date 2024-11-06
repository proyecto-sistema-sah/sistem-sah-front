import { Routes } from '@angular/router';
import { RouterGuard } from '@core/guards/router.guard';
import { InicioComponent } from './modules/inicio/inicio.component';

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [RouterGuard], // Protege la ruta de 'inicio'
        canActivateChild: [RouterGuard], // Si hay rutas hijas, aplica el guardián para los hijos
        loadChildren: () => import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
    },
    {
        path: 'registrar',
        loadChildren: () => import('./modules/registrar-usuario/registrar-usuario.module').then((m) => m.RegistrarUsuarioModule)
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
