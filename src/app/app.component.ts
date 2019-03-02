import { Component, OnInit } from '@angular/core';
import browser from 'browser-detect';
import { Observable, of } from 'rxjs';

import { environment as env } from '@env/environment';
import {
  routeAnimations
} from '@app/core';

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
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'stops', label: 'Stops' },
    { link: 'arrivals', label: 'Arrivals' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'Settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;

  constructor(
  ) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.isAuthenticated$ = of(false);
    this.stickyHeader$ = of(false);
    this.language$ = of('en');
    this.theme$ = of('Dark');
  }

  onLoginClick() {

  }

  onLogoutClick() {

  }

  onLanguageSelect({ value: language }) {

  }
}
