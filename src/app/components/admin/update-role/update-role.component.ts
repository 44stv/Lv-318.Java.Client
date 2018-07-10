import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {UpdateRoleModel} from '../../../models/update-role.model';
import {getAllRoles} from '../../../services/auth/roles';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

updateRoleModel = new UpdateRoleModel();
  roles: string[];
  isReadOnly = true;

  constructor( private location: Location, private userService: UserService) {
  }

  ngOnInit() {
    this.roles = getAllRoles();
    console.log(this.roles);
  }

  addFeedbackCriteria(): void {
    this.userService.updateRole(this.updateRoleModel)
        .subscribe(() => this.gotBack());
  }


  gotBack(): void {
    this.location.back();
  }

  add(role: string, email: string) {
    if (!(role == null && email == null)) {
      this.updateRoleModel.email = email;
      this.updateRoleModel.role = role;
    }
  }

  close() {
    this.gotBack();
  }
}
