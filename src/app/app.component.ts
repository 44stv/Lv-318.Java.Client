import { Component, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'uaTransport';

  @ViewChild('sidenav') public sideNav: MatSidenav;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ua');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  open() {
    this.sideNav.toggle();
  }
}
