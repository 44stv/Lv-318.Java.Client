import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {CustomAuthService} from '../auth/custom-auth.service';
import {Role} from '../auth/roles';
import {MatDialog} from '@angular/material';
import {ForbiddenComponent} from '../../components/main/errors/forbidden/forbidden.component';

@Injectable()
export class AdminGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: CustomAuthService,
              private router: Router,
              private dialog: MatDialog) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkRights();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  checkRights(): boolean {
    if ((this.authService.getRole() === Role.Admin) && !this.authService.isExpired()) {
      return true;
    } else {
      this.dialog.open(ForbiddenComponent);
      return false;
    }
  }

}
