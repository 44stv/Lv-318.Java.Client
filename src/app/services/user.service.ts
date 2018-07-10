import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import {UpdateRoleModel} from '../models/update-role.model';


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

  public createUser(user) {
    return this.http.post<User>(this.userUrl + '/', user);
  }

  public logIn(login) {
    return this.http.post<User>(this.userUrl + '/', login);
  }

  public updateRole(updateRoleModel: UpdateRoleModel) {
    return this.http.put<User>(`${this.userUrl}/update-role`, updateRoleModel );
  }

}
