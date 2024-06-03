import { NgModule } from '@angular/core';

import { ButtonCustomLegacyComponent } from './components/button-custom-legacy/button-custom-legacy.component';
import { ButtonCustomComponent } from './components/button-custom/button-custom.component';
import { NgContentFallbackComponent } from './ng-content-fallback.component';
import { NgContentFallbackRoutingModule } from './ng-content-fallback.routing';

@NgModule({
  declarations: [NgContentFallbackComponent],
  imports: [
    NgContentFallbackRoutingModule,
    ButtonCustomComponent,
    ButtonCustomLegacyComponent,
  ],
})
export class NgContentFallbackModule {}
