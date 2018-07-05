import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSidenav} from '@angular/material';
import {BreadcrumbService} from 'ng5-breadcrumb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uaTransport';

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(private translate: TranslateService, private breadcrumbService: BreadcrumbService) {
    translate.setDefaultLang('ua');
    this.breadcrumbService.addFriendlyNameForRoute('/main', 'Home');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  open() {
    this.sideNav.toggle();
  }
}
