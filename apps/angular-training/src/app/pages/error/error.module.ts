import { NgModule } from '@angular/core';
import { ErrorComponent } from './components';
import { ErrorRoutingModule } from './error.routing';

@NgModule({
	declarations: [ErrorComponent],
	imports: [ErrorRoutingModule]
})
export class ErrorModule {}
