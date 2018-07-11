import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Login } from '../../models/login.model';
import { environment } from '../../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AuthService {

  private loginUrl = environment.serverURL + '/user/signin/';

  constructor(private http: HttpClient) {
  }

  signIn(loginData: Login): Observable<any> {
    return this.http.post(this.loginUrl, loginData);
  }
}
