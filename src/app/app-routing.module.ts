import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopsComponent } from './stops/stops.component';
import { ArrivalsComponent } from './arrivals/arrivals.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'stops',
    component: StopsComponent,
    data: { title: 'anms.menu.stops' }
  },
  {
    path: 'arrivals',
    component: ArrivalsComponent,
    data: { title: 'anms.menu.arrivals' }
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
