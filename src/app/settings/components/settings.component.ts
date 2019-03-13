import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingsState } from '../settings.model';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'sb-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'DEFAULT-THEME', label: 'blue' },
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'NATURE-THEME', label: 'nature' },
    { value: 'BLACK-THEME', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'en' },
    { value: 'fr', label: 'fr' },
    { value: 'hi-in', label: 'hi-in' }
  ];

  constructor(private overlayContainer: OverlayContainer) {
    const settings: SettingsState = {
      language: 'en',
      theme: 'blue',
      autoNightMode: false,
      nightTheme: 'dark',
      stickyHeader: true,
      pageAnimations: true,
      pageAnimationsDisabled: false,
      elementsAnimations: true,
      hour: 1
    };

    this.settings$ = of<SettingsState>(settings);
  }

  ngOnInit() {}

  onLanguageSelect({ value: language }) {}

  onThemeSelect({ value: theme }) {}

  onAutoNightModeToggle({ checked: autoNightMode }) {}

  onStickyHeaderToggle({ checked: stickyHeader }) {}

  onPageAnimationsToggle({ checked: pageAnimations }) {}

  onElementsAnimationsToggle({ checked: elementsAnimations }) {}
}
