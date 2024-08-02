import { ApplicationRef, Component, DebugElement, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogDirective } from './confirm-dialog.directive';
import { By } from '@angular/platform-browser';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../../../../../app.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { OverlayModule,   } from '../../../services/overlay';
import { SpinnerComponent} from '@/shared/ui';

//Test Component for Directive
@Component({
	template: ` <button appConfirmDialog id="btn-dialog">Test</button>`
})
class TestComponent {}

describe('ConfirmDialogDirective', () => {
	let directive: ConfirmDialogDirective;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let viewContainerRef: ViewContainerRef;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let applicationRef: ApplicationRef;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let component: TestComponent;

	let fixture: ComponentFixture<TestComponent>;
	let fixtureAppComponent: ComponentFixture<AppComponent>;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let appComponent: AppComponent;
	let inputEl: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestComponent, AppComponent],
			imports: [
				ConfirmDialogDirective,
				HttpClientTestingModule,
				ConfirmDialogComponent,
				ConfirmDialogDirective,
				RouterTestingModule,
				OverlayModule,
				SpinnerComponent
			],
			providers: [ViewContainerRef, ApplicationRef, ConfirmDialogDirective]
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponent);
		fixtureAppComponent = TestBed.createComponent(AppComponent);

		viewContainerRef = TestBed.inject(ViewContainerRef);
		applicationRef = TestBed.inject(ApplicationRef);

		fixture.detectChanges();
		component = fixture.componentInstance;
		appComponent = fixtureAppComponent.componentInstance;
		inputEl = fixture.debugElement.query(By.css('button'));
		directive = fixture.debugElement
			.query(By.directive(ConfirmDialogDirective))
			.injector.get(ConfirmDialogDirective) as ConfirmDialogDirective;

		fixture.detectChanges();
		await fixture.whenStable();
	});
	it('should create an of test component', () => {
		expect(fixture).toBeTruthy();
	});

	it('should create a ConfirmDialogComponent when onClick() is called', async () => {
		//spyDirective
		const spyDirective = jest.spyOn(directive, 'onClick');

		//trigger event click
		inputEl.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call function and exist dialog
		expect(directive['existDialog']).toBeTruthy();
		expect(spyDirective).toHaveBeenCalled();
	});

	it('should be not multi render when multicliked in button with directive dialog', async () => {
		//spyDirective
		const spyDirective = jest.spyOn(directive, 'onClick');
		// spy Create Component method
		const spyCreateComponent = jest.spyOn(directive, 'showDialog');

		//trigger event click
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));
		inputEl.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call function and exist dialog
		expect(directive['existDialog']).toBeTruthy();
		expect(spyDirective).toHaveBeenCalled();
		//Validate only called once the method created component
		expect(spyCreateComponent).toHaveBeenCalledTimes(1);
	});
});
