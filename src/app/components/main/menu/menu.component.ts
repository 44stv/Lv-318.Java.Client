import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {AppComponent} from '../../../app.component';
import {TokenStorage} from '../../../services/auth/token/token-storage';
import {GlobalSearchService} from '../../../services/global-search.service';
import { AuthService } from '../../services/auth/auth.service';
import {Role} from "../../services/auth/roles";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {
  search = '';
  role: any = Role;

  constructor(public app: AppComponent,
              private router: Router,
              private tokenStorage: TokenStorage,
              private globalSearchComponent: GlobalSearchService,
              private location: Location) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.search);
  }

  switchLanguage(language: string) {
    this.app.switchLanguage(language);
  }

  onEnter(value: string) {
    this.globalSearchComponent.setSearchValue(value);
    this.router.navigate(['search/' + '?search=/' + value]);
  }

  isHomeRouteActivated(): boolean {
    return this.location.path().indexOf('/show-transit-scheme/') > -1;
  }

  hasToken(): boolean {
    return this.authService.hasToken();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['main']);
  }

  getRole(): Role {
    return this.authService.getRole();
  }

}
