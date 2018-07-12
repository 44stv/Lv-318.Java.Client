import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/roles';

@Injectable()
export class AdminGuardService {

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
    console.log('inside AdminGuard');
    if (this.authService.getRole() === Role.Admin) {
      return true;
    } else {
      this.router.navigate(['main/error/forbidden']);
      return false;
    }
  }

}
