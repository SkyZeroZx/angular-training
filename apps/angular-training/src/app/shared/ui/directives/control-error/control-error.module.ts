import { NgModule } from '@angular/core';

import { ControlErrorComponent } from './components/control-error.component';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorsDirective } from './directives/control-error.directive';

@NgModule({
	declarations: [ControlErrorComponent],
	imports: [ControlErrorContainerDirective, ControlErrorsDirective],
	exports: [ControlErrorContainerDirective, ControlErrorsDirective]
})
export class ControlErrorModule {}
