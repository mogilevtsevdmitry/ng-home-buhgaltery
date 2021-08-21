import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import {Observable} from 'rxjs'
import {DaoService} from './dao.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly authService: DaoService,
    private readonly route: Router,
  ) {
  }

  private _auth: boolean = false

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isAuthenticated().subscribe(auth => {
      this._auth = auth
    })
    if (!this._auth) {
      this.route.navigate(['/login'])
      return false
    } else {
      return this._auth
    }
  }


}
