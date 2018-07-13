import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {AddUserComponent} from '../add-user/add-user.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {UserLoginComponent} from '../user-login/user-login.component';
import {Location} from '@angular/common';
import {GlobalSearchService} from '../../../../services/global-search.service';
import {FriendInvitationComponent} from './friend-invitation/friend-invitation.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public app: AppComponent,
              private router: Router,
              private dialog: MatDialog ) {


  }

  ngOnInit() {
  }

  openModal() {
    this.dialog.open(FriendInvitationComponent);
  }

  openUpdatePassModal() {
    this.dialog.open(UpdatePasswordComponent);
  }


}
