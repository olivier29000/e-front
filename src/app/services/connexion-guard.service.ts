import { Inject, Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ConnexionGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService,
    @Inject(DOCUMENT) private document: Document) { }

  /**
   * verifie si l’utilisateur est connecté, si il l’est le gardien laisse passé, sinon il est redirigé sur /login
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable< boolean|UrlTree> {
    console.log(route.data.url)
    if(route.data.url){
      return this.authService.isLoggedInWithUrl(route.data.url).pipe(
        map(() => true)
        , catchError(() => of(this.router.parseUrl('/accueil'))));
      }else{
      return this.authService.isLoggedIn().pipe(
        map(() => true)
        , catchError(() => of(this.router.parseUrl('/login'))));
      }
    }
    


  }

