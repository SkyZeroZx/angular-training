import { addYearToDate } from './date.util';

describe('addYearToDate', () => {
	it('should add 1 year to the input date by default', () => {
		const inputDate = '2023-09-22';
		const expectedDate = '2024-09-22';

		const result = addYearToDate(inputDate);

		expect(result).toEqual(expectedDate);
	});

	it('should add the specified number of years to the input date', () => {
		const inputDate = '2023-09-22';
		const yearsToAdd = 5;
		const expectedDate = '2028-09-22';

		const result = addYearToDate(inputDate, yearsToAdd);

		expect(result).toEqual(expectedDate);
	});

	it('should handle leap years correctly', () => {
		const inputDate = '2020-02-29';
		const yearsToAdd = 4;
		const expectedDate = '2024-02-29';

		const result = addYearToDate(inputDate, yearsToAdd);

		expect(result).toEqual(expectedDate);
	});
});
