import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
	let service: FilterService;
	const initialData = [
		{ name: 'John Doe', email: 'john.doe@example.com' },
		{ name: 'Jane Doe', email: 'jane.doe@example.com' },
		{ name: 'Unique Doe', email: 'unique.doe@example.com' }
	];

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FilterService);
		service.setInitialData(initialData);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should filter the data by the given filter text and properties', () => {
		const filterText = 'doe';
		const filterProperties = ['name', 'email'];

		const filteredData = service.filterData(filterText, filterProperties);

		expect(filteredData).toEqual(initialData);
	});

	it('should return empty when filter dont match ', () => {
		const filterText = 'some_wrong';
		const filterProperties = ['name', 'email'];

		const filteredData = service.filterData(filterText, filterProperties);

		expect(filteredData).toEqual([]);
	});

	it('should return only result when exist and to transform for lowerCase and trim', () => {
		const filterText = 'UNIQUE ';
		const filterProperties = ['name', 'email'];

		const filteredData = service.filterData(filterText, filterProperties);

		expect(filteredData).toEqual([{ name: 'Unique Doe', email: 'unique.doe@example.com' }]);
	});

	it('should return the initial data if the filter text is empty', () => {
		const filterText = '';
		const filterProperties = ['name', 'email'];

		const filteredData = service.filterData(filterText, filterProperties);

		expect(filteredData).toEqual(initialData);
	});
});
