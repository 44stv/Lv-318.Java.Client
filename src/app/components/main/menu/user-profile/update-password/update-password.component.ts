import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {ForgetPasswordComponent, InfoResponse} from '../../user-login/forget-password/forget-password.component';
import {UpdatePassword} from '../../../../../models/update-password.model';
import {Router} from '@angular/router';
import {UserService} from '../../../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('newPassword').value;
    const passwordConfirmation = AC.get('passwordConfirmation').value;
    if (password !== passwordConfirmation) {
      AC.get('passwordConfirmation').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  hideOld: boolean = true;
  hide: boolean = true;
  hideConfirm: boolean = true;
  set isSent(value: boolean) {
    this._isSent = value;
  }
  private _isSent: boolean = false;
  updatePasswordForm: FormGroup;

  updatePassword: UpdatePassword;

  oldPasswordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);
  passwordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);
  passwordConfirmationControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(16),
  ]);

  constructor(public  matDialogRef: MatDialogRef<UpdatePasswordComponent>,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService) {
  }

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: this.oldPasswordControl,
      newPassword: this.passwordControl,
      passwordConfirmation: this. passwordConfirmationControl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  sendUpdatePassword() {
    this.updatePassword = this.updatePasswordForm.value;
    this.userService.sendUpdatePassword(this.updatePassword).subscribe((info: InfoResponse) => {
      this.snackBar.open(info.response, null, {
        duration: 5000
      });
      this._isSent = true;
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.response, null, {
          duration: 5000
        });
      }
    });
  }


}
