import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {User} from '../models/user.model';
import {Friend} from '../models/friend.model';
import {Login} from '../models/login.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {UpdatePassword} from '../models/update-password.model';
import {UpdateRoleModel} from '../models/update-role.model';
import {UserInfo} from '../models/userInfo.model';
import {UsersInfoPaginatorPaginator} from '../models/users-info-paginator';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {
  private userUrl = environment.serverURL + '/user';

  constructor(private http: HttpClient) {
  }

  public getUserInfo(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.userUrl}/info/${id}`);
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl, user);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.userUrl + '/signup', user);
  }

  public sendInvitation(friend: Friend): Observable<any> {
    return this.http.post(this.userUrl + '/invite', friend);
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

  sendUpdatePassword(updatePassword: UpdatePassword): Observable<any> {
    return this.http.post(this.userUrl + '/profile/update/password', updatePassword);

  }

  public updateRole(updateRoleModel: UpdateRoleModel) {
    return this.http.put<User>(`${this.userUrl}/update-role`, updateRoleModel);
  }

  public getAllUsersInfo(page: number, size: number): Observable<UsersInfoPaginatorPaginator> {
    return this.http.get<UsersInfoPaginatorPaginator>(`${this.userUrl}?page=${page}&size=${size}`);
  }
}

