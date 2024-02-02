import axios from 'axios';
import { useState, useEffect } from 'react';

function PaymentApi(token) {
	const [payments, setPayments] = useState([]);

	useEffect(() => {
		try {
			if (token) {
				const getPayments = async () => {
					const res = await axios.get('/api/payment?limit=1000', { headers: { Authorization: token } });
					setPayments(res.data.payments);
				};
				getPayments();
			}
		} catch (error) {
			console.log(error);
		}
	}, [token]);

	return {
		payments: [payments, setPayments],
	};
}

export default PaymentApi;
