import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SettingsComponent } from './components/settings.component';
import { SharedModule } from '@app/shared';
import { settingsReducer } from './settings.reducer';
import { SettingsEffects } from './settings.effects';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('settings', settingsReducer),
    EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule { }
