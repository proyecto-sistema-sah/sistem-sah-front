import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //  console.log('Router Guard', route.data, state);
    if(sessionStorage.getItem('userToken')){
      return true;
    }else{
      return this.router.createUrlTree(['/login'])
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   // console.log('Router Guard child', childRoute.data, state);
    return this.canActivate(childRoute, state); // Reutiliza la lógica de canActivate para rutas hijas
  }
}
