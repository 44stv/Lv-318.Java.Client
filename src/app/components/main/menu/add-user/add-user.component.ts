import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {BreadcrumbService} from 'ng5-breadcrumb';

import {User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router, public authService: AuthService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/user');
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

