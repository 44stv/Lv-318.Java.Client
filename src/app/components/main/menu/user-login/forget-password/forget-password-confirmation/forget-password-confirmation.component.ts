import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {UserService} from '../../../../../../services/user.service';
import {MatDialogRef} from '@angular/material/dialog';



export class InfoResponse {
  response: string;
}


@Component({
  selector: 'app-forget-password-confirmation',
  templateUrl: './forget-password-confirmation.component.html',
  styleUrls: ['./forget-password-confirmation.component.css']
})
export class ForgetPasswordConfirmationComponent implements OnInit {
  set isChanging(value: boolean) {
    this._isChanging = value;
  }

  private _isChanging: boolean;
  isError: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    const pathUUID = this.route.snapshot.paramMap.get('uuid');
      this.userService.changePassword(pathUUID).subscribe((response: InfoResponse) => {
        this.snackBar.open('Password changed', null, {
          duration: 6000
        });
          this._isChanging = true;
        //  this.router.navigate(['/']);
      },
       error => {
        this.snackBar.open('error', null, {
            duration: 5000
          });
          this.router.navigate(['/']);
      });
  }

}
