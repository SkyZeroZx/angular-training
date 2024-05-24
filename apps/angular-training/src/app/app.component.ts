import { Component, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	//https://github.com/angular/angular/issues/6446
	constructor(public viewContainerRef: ViewContainerRef) {}
}
