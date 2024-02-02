function FormatNumber(number){

const options1 = { style: 'currency', currency: 'VND' };
const numberFormat1 = new Intl.NumberFormat('vi', options1);

return numberFormat1.format(number)
}
export default FormatNumber;