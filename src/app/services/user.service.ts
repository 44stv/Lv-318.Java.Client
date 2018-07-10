import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment';
import {UpdateRoleModel} from '../models/update-role.model';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private userUrl = environment.serverURL + '/user';

  constructor(private http: HttpClient) {
  }


  public deleteUser(user) {
    return this.http.delete(this.userUrl, user);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.userUrl + '/signup', user);
  }

  public logIn(login) {
    return this.http.post<User>(this.userUrl + '/', login);
  }
  activateUser(uuid: string): Observable<any> {
    return this.http.post(this.userUrl + '/activate', uuid);
  }
  sendForgetPasswordConfirmation(login: Login): Observable<any> {
    return this.http.post(this.userUrl + '/forget/password/confirm', login);
  }
  changePassword(uuid: string): Observable<any> {
    return this.http.post(this.userUrl + '/update/password', uuid);
  }

  public updateRole(updateRoleModel: UpdateRoleModel) {
    return this.http.put<User>(`${this.userUrl}/update-role`, updateRoleModel );
  }

}
