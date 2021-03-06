import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {UserService} from '../../../../../services/user.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AddUserComponent} from '../add-user.component';
import {HttpErrorResponse} from '@angular/common/http';
import {BreadcrumbService} from 'ng5-breadcrumb';


export class InfoResponse {
  response: string;
}


@Component({
  selector: 'app-registaration-confirmation',
  templateUrl: './registaration-confirmation.component.html',
  styleUrls: ['./registaration-confirmation.component.css']
})
export class RegistarationConfirmationComponent implements OnInit {
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
  ) { this.breadcrumbService.hideRoute('/user/activate/'); }

  ngOnInit() {
    this._isChanging = false;
    const pathUUID = this.route.snapshot.paramMap.get('uuid');
      this.userService.activateUser(pathUUID).subscribe((info: InfoResponse) => {
        this.snackBar.open(info.response, null, {
          duration: 6000
        });
          this._isChanging = true;
          setTimeout(() =>  this.router.navigate(['/']), 3000);
      },
       error => {
         if (error instanceof HttpErrorResponse) {
           this.snackBar.open('Account activation Error! Try again', null, {
             duration: 5000
           });
           setTimeout(() =>  this.router.navigate(['/']), 3000);
         }
      });
  }

}
