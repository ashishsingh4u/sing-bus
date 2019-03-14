import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';
import { Actions, getEffectsMetadata } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import {
  AnimationsService,
  AppState
} from '@app/core';

import { SettingsEffects, SETTINGS_KEY } from './settings.effects';
import { SettingsState } from './settings.model';
import { ActionSettingsChangeTheme, SettingsActions } from './settings.actions';

describe('SettingsEffects', () => {
  let router: any;
  let overlayContainer: jasmine.SpyObj<OverlayContainer>;
  let animationsService: jasmine.SpyObj<AnimationsService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    router = {
      routerState: {
        snapshot: {}
      },
      events: {
        pipe() {}
      }
    };
    overlayContainer = jasmine.createSpyObj('OverlayContainer', [
      'getContainerElement'
    ]);
    animationsService = jasmine.createSpyObj('AnimationsService', [
      'updateRouteAnimationType'
    ]);
    translateService = jasmine.createSpyObj('TranslateService', ['use']);
    store = jasmine.createSpyObj('store', ['pipe']);
  });

  describe('updateTheme', () => {
    it('should not dispatch any action', () => {
      const actions = new Actions<SettingsActions>();
      const effect = new SettingsEffects(
        actions,
        store,
        router,
        overlayContainer,
        animationsService,
        translateService
      );
      const metadata = getEffectsMetadata(effect);

      expect(metadata.updateTheme).toEqual({ dispatch: false });
    });
  });
});
