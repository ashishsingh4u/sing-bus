import { NgModule } from '@angular/core';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [StaticRoutingModule],
  declarations: [AboutComponent]
})
export class StaticModule {}
