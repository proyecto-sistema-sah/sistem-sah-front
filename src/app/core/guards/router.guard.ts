import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Guardián de rutas para proteger el acceso a rutas específicas.
 * Este guardián verifica si el usuario tiene un token válido en `sessionStorage`
 * antes de permitirle acceder a una ruta.
 */
@Injectable({
  providedIn: 'root',
})
export class RouterGuard implements CanActivate, CanActivateChild {

  /**
   * Constructor del guardián.
   * @param router Instancia del enrutador de Angular para redireccionar a otras rutas si es necesario.
   */
  constructor(private router: Router) {}

  /**
   * Método principal para determinar si se puede activar una ruta.
   * @param route Información de la ruta actual.
   * @param state Estado del enrutador, que incluye la URL actual.
   * @returns `true` si el usuario tiene un token válido, de lo contrario, redirige al login.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarAutenticacion();
  }

  /**
   * Método para determinar si se puede activar una ruta hija.
   * Reutiliza la lógica de `canActivate`.
   * @param childRoute Información de la ruta hija actual.
   * @param state Estado del enrutador, que incluye la URL actual.
   * @returns `true` si el usuario tiene un token válido, de lo contrario, redirige al login.
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarAutenticacion();
  }

  /**
   * Verifica si el usuario tiene un token de sesión válido.
   * @returns `true` si existe un token en `sessionStorage`, de lo contrario, redirige al login.
   */
  private verificarAutenticacion(): boolean | UrlTree {
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
      return true;
    } else {
      // Redirige al login si no hay token
      return this.router.createUrlTree(['/login']);
    }
  }
}
