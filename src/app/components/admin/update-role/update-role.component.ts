import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UpdateRoleModel} from '../../../models/update-role.model';
import {getAllRoles} from '../../../services/auth/roles';
import {UserService} from '../../../services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

  updateRoleModel = new UpdateRoleModel();
  roles: string[];

  constructor(private location: Location,
              private userService: UserService,
              private  matDialogRef: MatDialogRef<UpdateRoleComponent>,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.roles = getAllRoles();
  }

  updateRole(): void {
    this.userService.updateRole(this.updateRoleModel)
      .subscribe(() => {
          this.snackBar.open('User updated successfully', null, {
            duration: 4000
          });
        }, (error) => {
          this.snackBar.open(error.error.message, null, {
            duration: 5000
          });
        }
      );
  }


  add(role: string, email: string) {
    if (!(role == null && email == null)) {
      this.updateRoleModel.email = email;
      this.updateRoleModel.role = role;
    } else {
      this.snackBar.open('Please type in correct values', null, {
        duration: 4000
      });
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
