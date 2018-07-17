import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../../../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import {BreadcrumbService} from 'ng5-breadcrumb';



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
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) { this.breadcrumbService.hideRoute('/forgetpass/**'); }

  ngOnInit() {
    const pathUUID = this.route.snapshot.paramMap.get('uuid');
    this.userService.changePassword(pathUUID).subscribe((response: InfoResponse) => {
      this.snackBar.open('Password changed', null, {
        duration: 3000
      });
      this._isChanging = true;
      setTimeout(() =>  this.router.navigate(['/']), 3000);
    }, (error) => {
      if (error instanceof HttpErrorResponse) {
        this.snackBar.open(error.error.response, null, {
          duration: 3000
        });
        setTimeout(() =>  this.router.navigate(['/']), 3000);
      }
    });
  }

}
