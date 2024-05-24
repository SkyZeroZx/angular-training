import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
	let service: LoaderService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoaderService]
		});

		service = TestBed.inject(LoaderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should show the loader when showLoader() is called', () => {
		// spy subject isLoading
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const isLoadingSubjectSpy = jest.spyOn(service.isLoadingSubject, 'next');

		// call showLoader()
		service.showLoader();

		// Call isLoading called with true
		expect(isLoadingSubjectSpy).toHaveBeenCalledWith(true);
	});

	it('should hide the loader when hideLoader() is called', () => {
		// spy subject isLoading
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		const isLoadingSubjectSpy = jest.spyOn(service.isLoadingSubject, 'next');

		// call showLoader()
		service.showLoader();

		// call hideLoader()
		service.hideLoader();

		// Call isLoading called with false
		expect(isLoadingSubjectSpy).toHaveBeenCalledWith(false);
	});
});
