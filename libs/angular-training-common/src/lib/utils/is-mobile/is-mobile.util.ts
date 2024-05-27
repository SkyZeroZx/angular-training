/**
 * The function `isMobile` checks if a given user agent string belongs to a mobile device based on
 * predefined keywords.
 * @param {string} userAgent - The `userAgent` parameter in the `isMobile` function is a string that
 * typically represents the User-Agent header sent by a client (such as a web browser) to the server.
 * This header contains information about the client's operating system, browser, and device.
 * @returns The `isMobile` function is being returned. This function takes a `userAgent` string as a
 * parameter and checks if the `userAgent` contains any of the mobile keywords specified in the
 * `mobileKeywords` array. If any of the keywords are found in the `userAgent`, the function returns
 * `true`, indicating that the user is using a mobile device. Otherwise, it returns `false
 */
export const isMobile = (userAgent: string) => {
	const mobileKeywords = [
		'Android',
		'MacIntel',
		'Motorola',
		'Nintendo',
		'iPhone',
		'iPad',
		'iPod',
		'Windows Phone',
		'BlackBerry',
		'Mobile'
	];
	return mobileKeywords.some((keyword) => userAgent?.includes(keyword));
};

/**
 * The function `isDesktop` determines if the user agent is not a mobile device.
 * @param {string} userAgent - The `userAgent` parameter typically refers to the string that contains
 * information about the user's browser, operating system, and device. This information is often used
 * to determine the type of device being used to access a website or application.
 * @returns The function `isDesktop` is returning the negation of the result of the `isMobile` function
 * called with the `userAgent` parameter.
 */
export const isDesktop = (userAgent: string) => {
	return !isMobile(userAgent);
};
