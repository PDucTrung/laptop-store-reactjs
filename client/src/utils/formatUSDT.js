function FormatUSDT(number) {
	const numberFormat1 = new Intl.NumberFormat('USD', {
		maximumSignificantDigits: 2,
	}).format(number / 23000);
	return numberFormat1;
}
export default FormatUSDT;
