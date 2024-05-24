import { NgModule } from '@angular/core';
import { ToastService } from './toast.service';
import { ToastComponent } from './components/toast.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [CommonModule],
	declarations: [ToastComponent],
	providers: [ToastService],
	exports: [ToastComponent]
})
export class ToastModule {}
