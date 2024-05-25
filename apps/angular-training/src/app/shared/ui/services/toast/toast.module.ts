import { NgModule } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastComponent } from './components/toast.component';
import { OverlayModule } from '../overlay';
 
@NgModule({
	imports: [OverlayModule ],
	declarations: [ToastComponent],
	providers: [ToastService],
	exports: [ToastComponent]
})
export class ToastModule {}
