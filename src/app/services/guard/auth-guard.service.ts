import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRights();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  checkRights(): boolean {
    if (this.authService.hasToken()) {
      this.router.navigate(['/error/']);
      return false;
    } else {
      return true;
    }
  }
}

