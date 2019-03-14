import { Component, OnInit } from '@angular/core';
import browser from 'browser-detect';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { environment as env } from '@env/environment';
import { routeAnimations } from '@app/core';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader,
  State
} from './settings';

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

  constructor(private store: Store<State>) {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {}

  onLogoutClick() {}

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
