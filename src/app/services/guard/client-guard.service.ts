import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/roles';

@Injectable()
export class ClientGuardService {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRights();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  checkRights(): boolean {
    console.log('AuthGuard#canActivate called');
    return this.authService.getRole() === Role.Client || this.authService.getRole() === Role.Admin;
  }

}
