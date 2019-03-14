import { ActivationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { interval, merge, of } from 'rxjs';
import {
  tap,
  withLatestFrom,
  map,
  distinctUntilChanged,
  mapTo,
  filter
} from 'rxjs/operators';

import {
  SettingsActionTypes,
  SettingsActions,
  ActionSettingsChangeHour
} from './settings.actions';

import {
  selectEffectiveTheme,
  selectSettingsState
} from './settings.selectors';

import { State } from './settings.model';

import { AnimationsService } from '@app/core';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('sb-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) {}

  @Effect()
  changeHour = interval(60_000).pipe(
    mapTo(new Date().getHours()),
    distinctUntilChanged(),
    map(hour => new ActionSettingsChangeHour({ hour }))
  );

  @Effect({ dispatch: false })
  updateRouteAnimationType = merge(
    INIT,
    this.actions$.pipe(
      ofType(
        SettingsActionTypes.CHANGE_ANIMATIONS_ELEMENTS,
        SettingsActionTypes.CHANGE_ANIMATIONS_PAGE
      )
    )
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectSettingsState))),
    tap(([action, settings]) =>
      this.animationsService.updateRouteAnimationType(
        settings.pageAnimations,
        settings.elementsAnimations
      )
    )
  );

  @Effect({ dispatch: false })
  updateTheme = merge(
    INIT,
    this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_THEME))
  ).pipe(
    withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
    tap(([action, effectiveTheme]) => {
      const classList = this.overlayContainer.getContainerElement().classList;
      const toRemove = Array.from(classList).filter((item: string) =>
        item.includes('-theme')
      );
      if (toRemove.length) {
        classList.remove(...toRemove);
      }
      classList.add(effectiveTheme);
    })
  );

  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettingsState),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => this.translateService.use(language))
  );
}
