import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';
import {TokenModel} from './token/token-model';
import {determineRole, Role} from './roles';
import {Login} from '../../models/login.model';

const helper = new JwtHelperService();


@Injectable()
export class AuthService {

  private accessToken = localStorage.getItem('accesToken');
  private decodedToken = this.decodeToken();
  private serviceUrl = environment.serverURL;

  constructor(public http: HttpClient) {
  }

  signIn(loginData: Login): Observable<any> {
    return this.http.post(`${this.serviceUrl}/user/signin`, loginData);
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(`this.serviceUrl/user/signup`, user);
  }

  public setToken(token: TokenModel): void {
    localStorage.setItem('accesToken', token.accessToken);
  }

  public getToken(): string {
    return localStorage.getItem('accesToken');
  }

  public logOut(): void {
    localStorage.removeItem('accesToken');
    localStorage.clear();
    this.decodedToken = null;
    this.accessToken = null;
  }

  public hasToken(): boolean {
    return this.getToken() != null;
  }

  public isExpired(): boolean {
    if (this.accessToken == null) {
      return false;
    }
    return helper.isTokenExpired(this.accessToken);
  }

  public getUserId(): number {
    let id: number;
    if (this.hasToken()) {
      id = this.decodedToken.id;
    } else {
      id = null;
    }
    return id;
  }

  public getRole(): Role {
    if (!this.hasToken()) {
      return Role.Unauthorized;
    }
    return determineRole(this.decodedToken.auth);
  }

  private decodeToken(): any {
    return helper.decodeToken(this.accessToken);
  }
}
