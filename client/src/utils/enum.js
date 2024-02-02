const Enumeration = {

	states: [
		{ code: 'INIT', name: 'Mới' },
		{ code: 'APPROVE', name: 'Đã duyệt' },
		{ code: 'TRANSPORTING', name: 'Đang giao hàng' },
		{ code: 'SUCCESS', name: 'Giao hàng thành công' },
		{ code: 'CANCEL', name: 'Hủy đơn hàng' },
	],
	INIT: 'INIT',
	APPROVE: 'APPROVE',
	TRANSPORTING: 'TRANSPORTING',
	SUCCESS: 'SUCCESS',
	CANCEL: 'CANCEL',
	listButton: [
		{ id: 0, lable: 'Tất cả', search: 'all' },
		{ id: 1, lable: '1 sao', search: 1 },
		{ id: 2, lable: '2 sao', search: 2 },
		{ id: 3, lable: '3 sao', search: 3 },
		{ id: 4, lable: '4 sao', search: 4 },
		{ id: 5, lable: '5 sao', search: 5 },
	],
};

export default Enumeration;
