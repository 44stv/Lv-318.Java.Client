import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CustomAuthService} from '../auth/custom-auth.service';
import {Role} from '../auth/roles';
import {ForbiddenComponent} from '../../components/main/errors/forbidden/forbidden.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class ClientGuardService {

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
    if ((this.authService.getRole() === Role.User || this.authService.getRole() === Role.Admin) && !this.authService.isExpired()) {
      return true;
    } else {
      this.dialog.open(ForbiddenComponent);
      return false;
    }
  }

}
