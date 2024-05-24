import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[appControlErrorContainer]',
	standalone: true
})
export class ControlErrorContainerDirective {
	constructor(public vcr: ViewContainerRef) {}
}
