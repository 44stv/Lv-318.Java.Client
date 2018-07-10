import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSidenav} from '@angular/material';
import {BreadcrumbService} from 'ng5-breadcrumb';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material';
import { ChooseTransitComponent } from './components/main/choose-transit/choose.transit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uaTransport';


  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(private translate: TranslateService, private breadcrumbService: BreadcrumbService, 
    private location: Location,
    public dialog: MatDialog) {

    translate.setDefaultLang('ua');
    this.breadcrumbService.addFriendlyNameForRoute('/main', 'Home');
    this.breadcrumbService.hideRoute('/main/user');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  open() {
    this.sideNav.toggle();
  }
  isFeedbackActivated(): boolean {
    return this.location.path().indexOf('/show-transit-scheme/') > -1;
  }

  openChooseTransitModal(){
    this.dialog.open(ChooseTransitComponent, {
      width: '60%', height:'50%'});

  }
}
