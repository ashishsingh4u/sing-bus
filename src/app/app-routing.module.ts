import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopsComponent } from './stops/stops.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';
import { SettingsComponent } from './settings/component/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'stops',
    component: StopsComponent,
    data: { title: 'sb.menu.stops' }
  },
  {
    path: 'arrivals',
    component: ArrivalsComponent,
    data: { title: 'sb.menu.arrivals' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'sb.menu.settings' }
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
