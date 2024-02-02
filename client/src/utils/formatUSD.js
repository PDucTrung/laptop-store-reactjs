function FormatUSD(number) {
	const numberFormat1 = new Intl.NumberFormat('USD', {
		maximumSignificantDigits: 4,
	}).format(number / 23000);
	return numberFormat1;
}
export default FormatUSD;
