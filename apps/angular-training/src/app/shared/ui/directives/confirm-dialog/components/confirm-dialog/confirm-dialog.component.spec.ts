import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogOptions } from '../../interfaces';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ConfirmDialogComponent', () => {
	let component: ConfirmDialogComponent;
	let fixture: ComponentFixture<ConfirmDialogComponent>;

	let cancelBtn: DebugElement;
	let confirmBtn: DebugElement;

	const mockConfirmDialogOptions: ConfirmDialogOptions = {
		message: 'Mock Init Message',
		title: 'Mock Title',
		confirmButtonText: 'Confirm Mock',
		cancelButtonText: 'Cancel Mock'
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ConfirmDialogComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ConfirmDialogComponent);
		component = fixture.componentInstance;
		component.confirmDialogOptions.set(mockConfirmDialogOptions);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when clicked confirm validate call confirm and remove component', async () => {
		const spyConfirm = jest.spyOn(component.confirmed, 'emit');
		const spyRemoveConfirmDialog = jest.spyOn(component, 'removeConfirmDialog');

		// get reference of cancel button
		confirmBtn = fixture.debugElement.query(By.css('[data-test="confirm-button"'));

		//Trigger event of clicked in cancel
		confirmBtn.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call cancel emit event

		expect(spyConfirm).toHaveBeenCalled();
		// Validate remove confirm dialog call
		expect(spyRemoveConfirmDialog).toHaveBeenCalled();
	});

	it('when call cancel should emit canceled and remove component', async () => {
		const spyCancel = jest.spyOn(component.canceled, 'emit');
		const spyRemoveConfirmDialog = jest.spyOn(component, 'removeConfirmDialog');

		// get reference of cancel button
		cancelBtn = fixture.debugElement.query(By.css('[data-test="cancel-button"'));

		//Trigger event of clicked in cancel
		cancelBtn.triggerEventHandler('click', new MouseEvent('click'));

		fixture.detectChanges();
		// await execution
		await fixture.whenStable();

		// Validate call cancel emit event
		expect(spyCancel).toHaveBeenCalled();

		// Validate remove confirm dialog call
		expect(spyRemoveConfirmDialog).toHaveBeenCalled();
	});

	it('should valid value of message , title and text buttons in dialogConfirm', async () => {
		// get refence of title , message and buttons
		const dialogTitle = fixture.debugElement.query(By.css('[data-test="dialog-title"'));
		const dialogMessage = fixture.debugElement.query(By.css('[data-test="dialog-message"'));
		const confirmButton = fixture.debugElement.query(By.css('[data-test="confirm-button"'));
		const cancelButton = fixture.debugElement.query(By.css('[data-test="cancel-button"'));

		//validate text
		expect(dialogTitle.nativeElement.innerHTML.trim()).toEqual(mockConfirmDialogOptions.title);
		expect(dialogMessage.nativeElement.innerHTML.trim()).toEqual(mockConfirmDialogOptions.message);
		expect((confirmButton.nativeElement as HTMLElement).textContent.trim()).toEqual(
			mockConfirmDialogOptions.confirmButtonText
		);
		expect(cancelButton.nativeElement.textContent.trim()).toEqual(
			mockConfirmDialogOptions.cancelButtonText
		);
	});
});
