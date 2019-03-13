import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SettingsComponent } from './components/settings.component';
import { SharedModule } from '@app/shared';
import { SettingsEffects } from './settings.effects';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    SharedModule,
    // EffectsModule.forFeature([SettingsEffects])
  ]
})
export class SettingsModule { }
