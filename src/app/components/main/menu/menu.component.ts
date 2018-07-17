import {Component, OnChanges, OnInit, SimpleChanges, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppComponent} from '../../../app.component';
import {GlobalSearchService} from '../../../services/global-search.service';
import {CustomAuthService} from '../../../services/auth/custom-auth.service';
import {Role} from '../../../services/auth/roles';

import {MatDialog} from '@angular/material';
import {AddUserComponent} from './add-user/add-user.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {
  @ViewChild(FormControl) myControl = new FormControl();
  role: any = Role;

  constructor(public app: AppComponent,
              private router: Router,
              private authService: CustomAuthService,
              private globalSearchComponent: GlobalSearchService,
              private location: Location,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  switchLanguage(language: string) {
    this.app.switchLanguage(language);
  }

  isHomeRouteActivated(): boolean {
    return this.location.path().indexOf('/show-transit-scheme/') > -1;
  }

  hasToken(): boolean {
    return this.authService.hasToken();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/main']);
  }

  openModal() {
    this.dialog.open(AddUserComponent);
  }

  openLogInModal() {
    this.dialog.open(UserLoginComponent);
  }

  getRole(): Role {
    return this.authService.getRole();
  }

}
