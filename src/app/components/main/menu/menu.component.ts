import { Component, OnChanges, OnInit, SimpleChanges, Input, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {GlobalSearchService} from '../../../services/global-search.service';
import {MatDialog} from '@angular/material';
import {AddUserComponent} from './add-user/add-user.component';
import {UserLoginComponent} from './user-login/user-login.component';
import { FormControl } from '@angular/forms';
import { TokenStorage } from '../../../services/auth/token/token-storage';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {
  @ViewChild(FormControl) myControl = new FormControl();


  constructor(public app: AppComponent,

              private router: Router,
              private tokenStorage: TokenStorage,
              private globalSearchComponent: GlobalSearchService,
              private location: Location,
              private dialog: MatDialog ) {


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
    return this.tokenStorage.hasToken();
  }

  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['main']);
  }
  openModal() {
    this.dialog.open(AddUserComponent);
  }
  openLogInModal() {
    this.dialog.open(UserLoginComponent);
  }
}
