/**
 * The function `addYearToDate` takes a date string and adds a specified number of years to it,
 * returning the resulting date in ISO format.
 * @param {string} dateToAdd - A string representing a date in the format "YYYY-MM-DD".
 * @param [years=1] - The "years" parameter is an optional parameter that specifies the number of years
 * to add to the given date. If no value is provided for the "years" parameter, it defaults to 1.
 * @returns a string representing the date after adding the specified number of years to the input
 * date.
 */
export function addYearToDate(dateToAdd: string, years = 1) {
	const date = new Date(dateToAdd);
	date.setFullYear(date.getFullYear() + years);
	return date.toISOString().slice(0, 10);
}

export function currentDate(): string {
	return new Date().toISOString().slice(0, 10);
}
