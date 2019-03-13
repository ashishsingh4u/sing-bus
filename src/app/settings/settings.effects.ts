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

import { AnimationsService } from '@app/core';

export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('sb-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private animationsService: AnimationsService,
    private translateService: TranslateService
  ) {}
}
