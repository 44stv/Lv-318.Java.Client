import { Component, OnInit } from '@angular/core';
import {AddUserComponent, InfoResponse} from '../../add-user/add-user.component';
import {UserService} from '../../../../../services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {Friend} from '../../../../../models/friend.model';


@Component({
  selector: 'app-friend-invitation',
  templateUrl: './friend-invitation.component.html',
  styleUrls: ['./friend-invitation.component.scss']
})
export class FriendInvitationComponent implements OnInit {

  set isSent(value: boolean) {
    this._isSent = value;
  }

  friend: Friend;
  friendForm: FormGroup;

  private _isSent = false;

  constructor(public  matDialogRef: MatDialogRef<FriendInvitationComponent>,
              private router: Router, private snackBar: MatSnackBar,
              private fb: FormBuilder, public userService: UserService) {

  }
  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
  ]);

  createForm() {
    this.friendForm = this.fb.group({
      friendName: this.firstnameControl,
      friendEmail: this.emailControl
    });
  }


  sendInvitation() {
    this.friend = this.friendForm.value;
    this.userService.sendInvitation(this.friend).subscribe((info: InfoResponse) => {
      this.snackBar.open(info.response, null, {
        duration: 3000
      });
      this._isSent = true;
      setTimeout(() =>  this.matDialogRef.close(), 3000);
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.message, null, {
          duration: 3000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

}
