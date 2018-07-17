import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Login} from '../../../../models/login.model';
import {CustomAuthService} from '../../../../services/auth/custom-auth.service';
import {TokenModel} from '../../../../services/auth/token/token-model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import {MatDialogRef} from '@angular/material/dialog';

import { HttpErrorResponse } from '@angular/common/http';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  login: Login;
  loginForm: FormGroup;
  hide: boolean = true;
  returnUrl: string;


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

  constructor(public  matDialogRef: MatDialogRef<UserLoginComponent>,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private fb: FormBuilder, private router: Router,
              private authService: CustomAuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  logIn() {
    this.login = this.loginForm.value;
    this.authService.signIn(this.login)
      .subscribe((token: TokenModel) => {
        this.authService.setToken(token);
        this.snackBar.open('User loged successfully', null, {
          duration: 3000
        });
        setTimeout(() => this.matDialogRef.close(), 3000);
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error.description === 'User is disabled') {
            this.snackBar.open('Your account is not activated. Please confirm the registration', null, {
              duration: 3000
            });
          } else {
            this.snackBar.open(error.error.message, null, {
              duration: 3000
            });
          }
        }
      });
  }


  createForm() {
    this.loginForm = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  openForgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
    this.matDialogRef.close();
  }

}
