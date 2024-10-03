import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    },
    {
        path: 'registrar',
        loadChildren: () => import('./modules/registrar-usuario/registrar-usuario.module').then((m) => m.RegistrarUsuarioModule)
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
