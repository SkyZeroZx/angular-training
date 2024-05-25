import { NgModule } from '@angular/core';
import { ConfirmDialogDirective } from './directive/confirm-dialog.directive';
import { OverlayModule } from '../../services/overlay';
 
@NgModule({
  imports: [ConfirmDialogDirective, OverlayModule],
  exports: [ConfirmDialogDirective],
})
export class ConfirmDialogModule {}
