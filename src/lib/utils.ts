type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'sv') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date);
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	console.log('Date to format: ', dateToFormat);
	return dateFormatter.format(dateToFormat);
}
