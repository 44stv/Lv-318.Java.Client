import {Component, OnInit, SimpleChanges} from '@angular/core';
import {AppComponent} from '../../../../app.component';
import {AddUserComponent} from '../add-user/add-user.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {UserLoginComponent} from '../user-login/user-login.component';
import {Location} from '@angular/common';
import {GlobalSearchService} from '../../../../services/global-search.service';
import {FriendInvitationComponent} from './friend-invitation/friend-invitation.component';
import {UpdatePasswordComponent} from './update-password/update-password.component';
import {BreadcrumbService} from 'ng5-breadcrumb';
import {environment} from '../../../../../environments/environment';
import {Transit} from '../../../../models/transit.model';
import {TransitService} from '../../../../services/transit.service';
import {CustomAuthService} from '../../../../services/auth/custom-auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  categoryId: number;
  topName: string;
  cityName: string;
  averageRateArray: Map<number, number> = new Map<number, number>();

  categoryIconURL = `${environment.serverURL}/category/img?link=`;

  displayedColumns = ['categoryIcon', 'name', 'routeName'];

  dataSource: MatTableDataSource<Transit> = new MatTableDataSource();




  constructor(private transitService: TransitService,
              private route: ActivatedRoute,
              public app: AppComponent,
              private router: Router,
              private dialog: MatDialog,
              private authService: CustomAuthService,
              private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.hideRoute('/main/user');
  }

  ngOnInit() {
    this.getAllUserTransits();
  }

  openModal() {
    this.dialog.open(FriendInvitationComponent);
  }

  openUpdatePassModal() {
    this.dialog.open(UpdatePasswordComponent);
  }

  getAllUserTransits(): void {
    this.transitService.getAllUserTransits(1)
      .subscribe(transits => {
        this.dataSource.data = transits;
      });

  }

}
