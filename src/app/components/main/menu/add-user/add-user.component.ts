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

  constructor(private router: Router, private userService: UserService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/user');
  }

  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => {
        alert('User created successfully.');
      });

  }

}

