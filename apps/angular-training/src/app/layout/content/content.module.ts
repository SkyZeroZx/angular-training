import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components';
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [ContentComponent, HeaderComponent],
  imports: [RouterModule, NgOptimizedImage],
})
export class ContentModule {}
