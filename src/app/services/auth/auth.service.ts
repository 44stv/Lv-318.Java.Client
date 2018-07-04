import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Login} from '../../models/login.model';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user.model';
import {TokenModel} from "./token/token-model";

@Injectable()
export class AuthService {

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
  }

  public hasToken(): boolean {
    return this.getToken() != null;
  }
}
