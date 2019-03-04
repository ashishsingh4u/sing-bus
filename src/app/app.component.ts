import { Component, OnInit } from '@angular/core';
import browser from 'browser-detect';
import { Observable, of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { environment as env } from '@env/environment';
import { routeAnimations } from '@app/core';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  title = 'Sing-Bus';
  titleLong = 'Singapore Bus';
  menuLogin = 'Sign in';
  menuLogout = 'Logout';
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = ['en', 'fr', 'hi-in'];

  navigation = [
    { link: 'about', label: 'sb.menu.about' },
    { link: 'stops', label: 'sb.menu.stops' },
    { link: 'arrivals', label: 'sb.menu.arrivals' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'sb.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.isAuthenticated$ = of(false);
    this.stickyHeader$ = of(false);
    this.language$ = of('en');
    this.theme$ = of('Dark');
  }

  onLoginClick() {}

  onLogoutClick() {}

  onLanguageSelect({ value: language }) {
    this.translate.use(language);
  }
}
