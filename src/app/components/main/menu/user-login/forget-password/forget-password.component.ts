import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

import {UserService} from '../../../../../services/user.service';
import {Login} from '../../../../../models/login.model';
import {HttpErrorResponse} from '@angular/common/http';

export class InfoResponse {
  response: string;
}
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const passwordConfirmation = AC.get('passwordConfirmation').value;
    if (password !== passwordConfirmation) {
      AC.get('passwordConfirmation').setErrors({MatchPassword: true});
    } else {
      return null;
    }
  }
}

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  set isSent(value: boolean) {
    this._isSent = value;
  }
    private _isSent: boolean = false;
    forgetPasswordForm: FormGroup;
    login: Login;

    emailControl: FormControl = new FormControl('', [
        Validators.required,
        Validators.email,
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

    constructor(public  matDialogRef: MatDialogRef<ForgetPasswordComponent>,
                private formBuilder: FormBuilder,
                private router: Router,
                private snackBar: MatSnackBar,
                private userService: UserService) {
    }

    ngOnInit() {
        this.forgetPasswordForm = this.formBuilder.group({
            email: this.emailControl,
            password: this.passwordControl,
          passwordConfirmation: this. passwordConfirmationControl
        }, {
          validator: PasswordValidation.MatchPassword
        });
    }

    sendConfirmation() {
        this.login = this.forgetPasswordForm.value;
        this.userService.sendForgetPasswordConfirmation(this.login).subscribe((info: InfoResponse) => {
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
