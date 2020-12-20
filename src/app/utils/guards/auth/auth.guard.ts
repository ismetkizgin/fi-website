import { Injectable } from '@angular/core';
import { AuthService } from '../../services';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _authenticationService: AuthService
  ) {}

  callback: Function;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const response: any = await this._authenticationService.tokenDecode();
    if (response) {
      if (
        next.data.authorize &&
        next.data.authorize.indexOf(response.UserTypeName) === -1
      ) {
        this._router.navigate(['/admin']);
        return false;
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
