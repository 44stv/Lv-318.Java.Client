import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from 'ng5-breadcrumb';

import {Login} from '../../../../models/login.model';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokenModel} from '../../../../services/auth/token/token-model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  login: Login = new Login();

  constructor(private router: Router, private authService: AuthService) {
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
