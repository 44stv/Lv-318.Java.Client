import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from 'ng5-breadcrumb';

import {Login} from '../../../../models/login.model';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokenStorage} from '../../../../services/auth/token/token-storage';
import {TokenModel} from '../../../../services/auth/token/token-model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  login: Login = new Login();

  constructor(private router: Router, private authService: AuthService,
              private tokenStorage: TokenStorage) {
  }

  logIn() {
    this.authService.signIn(this.login)
      .subscribe((token: TokenModel) => {
        this.authService.setToken(token);
        alert('User loged successfully.');
        this.router.navigate(['main']);
      });
  }
}
