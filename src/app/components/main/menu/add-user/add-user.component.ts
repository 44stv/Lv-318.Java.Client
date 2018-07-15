///<reference path="../../../../../../node_modules/rxjs/internal/Observable.d.ts"/>
import {Component, OnInit} from '@angular/core';

import {User} from '../../../../models/user.model';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserService} from '../../../../services/user.service';
import {BreadcrumbService} from 'ng5-breadcrumb';

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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  set isSent(value: boolean) {
    this._isSent = value;
  }

  user: User;

  hide: boolean = true;
  hideConfirm: boolean = true;


  userForm: FormGroup;

  private _isSent = false;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              public userService: UserService,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/user');

  }

  emailControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
  ]);
  lastnameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(255)
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

  createForm() {
    this.userForm = this.fb.group({
      firstName: this.firstnameControl,
      lastName: this.lastnameControl,
      email: this.emailControl,
      password: this.passwordControl,
      passwordConfirmation: this.passwordConfirmationControl
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }


  createUser() {
    this.user = this.userForm.value;
    this.userService.createUser(this.user).subscribe((info: InfoResponse) => {
      this.snackBar.open(info.response, null, {
        duration: 4000
      });
      this._isSent = true;
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.message, null, {
          duration: 5000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createForm();
  }


}



