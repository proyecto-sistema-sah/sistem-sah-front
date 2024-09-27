import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
