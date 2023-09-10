import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthResponse} from "../models/auth/auth-response.model";


@Injectable({
  providedIn: "root"
})
class AccessGuardService {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = localStorage.getItem('userData');

    if (user) {
      const authResponse: AuthResponse = JSON.parse(user);
      const token = authResponse.token;

      if (token) {
        return true;
      }
    }
    this.router.navigate(['login']);

    return false;
  }
}

export const isAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AccessGuardService).canActivate(route, state);

}
