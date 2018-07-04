import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router,  public authService: AuthService) {

  }

  createUser(): void {
    this.authService.signUp(this.user).subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }

}

