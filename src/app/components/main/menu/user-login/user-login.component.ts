import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {Login} from '../../../../models/login.model';
import {AuthService} from '../../../../services/auth/auth.service';
import {TokenStorage} from '../../../../services/auth/token/token-storage';
import {TokenModel} from '../../../../services/auth/token/token-model';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

import {HttpErrorResponse} from '@angular/common/http';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';

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
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  login: Login ;
  loginForm: FormGroup;
  hide: boolean = true;
  hideConfirm: boolean = true;

  constructor(public  matDialogRef: MatDialogRef<UserLoginComponent>,
              private snackBar: MatSnackBar,
              private fb: FormBuilder, private router: Router, private authService: AuthService,
              private tokenStorage: TokenStorage,
              private dialog: MatDialog) {
  }

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

  logIn() {
    this.login = this.loginForm.value;
    this.authService.signIn(this.login)
      .subscribe((token: TokenModel) => {
        this.tokenStorage.saveToken(token);
        alert('User loged successfully.');
        this.snackBar.open('User loged successfully', null, {
          duration: 4000
        });
        this.router.navigate(['main']);
      }, (error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.error.description === 'User is disabled') {
          this.snackBar.open('Your account is not activated. Please confirm the registration', null, {
            duration: 5000
          });
        } else {
          this.snackBar.open(error.error.response, null, {
            duration: 5000
          });
        }
      }
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
      passwordConfirmation: this. passwordConfirmationControl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  ngOnInit(): void {
    this.createForm();
  }
  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
    this.matDialogRef.close();
  }
}
