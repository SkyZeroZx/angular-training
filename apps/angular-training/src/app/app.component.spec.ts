import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent, ToastModule } from './shared/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule, SpinnerComponent, ToastModule, BrowserAnimationsModule],
			declarations: [AppComponent]
		}).compileComponents();
	});

	it('should render', () => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled).toBeTruthy();
	});
});
