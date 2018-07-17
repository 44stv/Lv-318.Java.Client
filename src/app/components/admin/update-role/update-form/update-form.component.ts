import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {UpdateRoleModel} from '../../../../models/update-role.model';
import {UserService} from '../../../../services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {getAllRoles} from '../../../../services/auth/roles';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  updateRoleModel = new UpdateRoleModel();
  roles: string[];
  userEmail: string = this.data.email;
  role: string;
  firstName: string = this.data.firstName;
  lastName: string = this.data.lastName;


  constructor(private location: Location,
              private userService: UserService,
              private  matDialogRef: MatDialogRef<UpdateFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.roles = getAllRoles();

  }

  updateRole(): void {
    if (this.role !== undefined && this.userEmail !== undefined) {
      this.add(this.role, this.userEmail);
      this.userService.updateRole(this.updateRoleModel)
        .subscribe(() => {
            this.snackBar.open('User updated successfully', null, {
              duration: 4000
            });
            this.matDialogRef.close();
          }, (error) => {
            this.snackBar.open(error.error.message, null, {
              duration: 5000
            });
            this.matDialogRef.close();
          }
        );
    } else {
      this.snackBar.open('Please, specify the data to update', null, {
        duration: 4000
      });
    }
  }


  add(role: string, userEmail: string) {
    if (!(role == null && this.userEmail == null)) {
      this.updateRoleModel.email = userEmail;
      this.updateRoleModel.role = role;
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
