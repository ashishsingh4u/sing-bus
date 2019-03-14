import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { SettingsModule } from '@app/settings';
import { StaticModule } from './static';
import { AppComponent } from './app.component';
import { StopsComponent } from './stops/stops.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, StopsComponent, ArrivalsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StaticModule,
    SettingsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
