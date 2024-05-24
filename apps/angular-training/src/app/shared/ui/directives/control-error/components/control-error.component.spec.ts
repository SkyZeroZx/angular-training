import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlErrorComponent } from './control-error.component';

describe('ControlErrorComponent', () => {
	let component: ControlErrorComponent;
	let fixture: ComponentFixture<ControlErrorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ControlErrorComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ControlErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('when set text should change hide', () => {
		const textError = 'Longitud Minina es 6 caracteres';
		component.text = textError;

		expect(component._hide()).toBeFalsy();
		expect(component._text()).toEqual(textError);
	});
});
