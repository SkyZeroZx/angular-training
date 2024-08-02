import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './control-error.directive';
import { ControlErrorModule } from '../control-error.module';
import { defaultErrors } from '../form-error';

//Test Component for Directive
@Component({
	template: `
		<form [formGroup]="formGroupTest">
			<input type="text" id="input-test-name" formControlName="name" />

			<input type="text" id="input-test-description" formControlName="description" />

			<input type="text" id="input-test-description" formControlName="other" />
		</form>
	`
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestComponentControlError implements OnInit {
	formGroupTest!: FormGroup;
	constructor(private fb: FormBuilder) {}
	ngOnInit(): void {
		this.formGroupTest = this.fb.group({
			name: this.fb.control('', Validators.required),
			description: this.fb.control('', Validators.minLength(3)),
			other: this.fb.control('', Validators.maxLength(2))
		});
	}
}

describe('ConfirmDialogDirective', () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let component: TestComponentControlError;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let directive: ControlErrorsDirective;
	let fixture: ComponentFixture<TestComponentControlError>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TestComponentControlError],
			imports: [CommonModule, ControlErrorModule, ReactiveFormsModule, FormsModule],
			providers: [ViewContainerRef, ControlErrorsDirective]
		}).compileComponents();

		fixture = TestBed.createComponent(TestComponentControlError);
		fixture.detectChanges();
		component = fixture.componentInstance;
	});

	it('shoul create component test', () => {
		expect(fixture).toBeTruthy();
	});

	it('should trigger render of error when field is required', async () => {
		// Set value empty string in control name
		component.formGroupTest.controls['name'].setValue('');

		//Detect changes and await
		fixture.detectChanges();
		await fixture.whenStable();

		// Get error text of the component control error
		const errorTextElement = fixture.debugElement.query(By.css('#text-error'));
		const text = errorTextElement.nativeElement as HTMLElement;

		//validate element is defined
		expect(text).toBeDefined();
		//validate default text validation
		expect(text.innerHTML).toEqual(defaultErrors['required']({}));
	});

	it('should trigger render of error whend field is minlength required', async () => {
		// Set value string with length minor the required in the control
		component.formGroupTest.controls['description'].setValue('12');

		//Detect changes and await
		fixture.detectChanges();
		await fixture.whenStable();

		// Get error text of the component control error
		const errorTextElement = fixture.debugElement.query(By.css('#text-error'));
		const text = errorTextElement.nativeElement as HTMLElement;

		//validate element is defined
		expect(text).toBeDefined();
		//validate default text validation
		expect(text.innerHTML).toEqual(defaultErrors['minlength']({ requiredLength: '3' }));
	});

	it('should trigger render of error whend field is maxLength required', async () => {
		// Set value string with length greater than the required in the control
		component.formGroupTest.controls['other'].setValue('123');

		//Detect changes and await
		fixture.detectChanges();
		await fixture.whenStable();

		// Get error text of the component control error
		const errorTextElement = fixture.debugElement.query(By.css('#text-error'));
		const text = errorTextElement.nativeElement as HTMLElement;

		//validate element is defined
		expect(text).toBeDefined();
		//validate default text validation
		expect(text.innerHTML).toEqual(defaultErrors['maxlength']({ requiredLength: '2' }));
	});
});
