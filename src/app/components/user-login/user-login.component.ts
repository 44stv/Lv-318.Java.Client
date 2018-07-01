import {Component, Input, OnChanges} from '@angular/core';
import { Router } from '@angular/router';

import { Login } from '../../models/login.model';
import { TokenStorage } from '../../services/auth/token/token-storage';
import { TokenModel } from '../../services/auth/token/token-model';
import { AuthService } from '../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnChanges {

  @Input() login: Login;
  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm: FormGroup;
  states = this.states;
  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorage, private fb: FormBuilder) {
    this.createForm();
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required , Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
    this.rebuildForm();
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
    this.loginForm.reset();
  }

  logIn() {
    this.authService.signIn(this.login)
      .subscribe((token: TokenModel) => {
        this.tokenStorage.saveToken(token);
        alert('User loged successfully.');
        this.router.navigate(['main']);
      });
  }
}

/*implements OnChanges {

@Input() user: User;
  email = new FormControl('', [Validators.required, Validators.email]);

  userForm: FormGroup;
  states = this.states;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.createForm();

  }

  createUser(): void {
    this.userService.createUser(this.user)
    .subscribe(data => {
      alert('User created successfully.');
    });

}
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required , Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnChanges() { // <-- call rebuildForm in ngOnChanges
    this.rebuildForm();
  }

  rebuildForm() { // <-- wrap patchValue in rebuildForm
    this.userForm.reset();
  }

}*/
