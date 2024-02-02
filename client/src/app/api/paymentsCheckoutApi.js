import axios from 'axios';
import { useState, useEffect } from 'react';

function PaymentCheckoutApi(token) {
	const [paymentsCheckout, setPaymentsCheckout] = useState([]);
	const [paymentsCheckouts, setPaymentsCheckouts] = useState([]);

	useEffect(() => {
		try {
			if (token) {
				const getPayments = async () => {
					const res = await axios.get('/user/historyCheckout?limit=1000', { headers: { Authorization: token } });
					setPaymentsCheckout(res.data);
				};
				getPayments();
			}
		} catch (error) {
			console.log(error);
		}
	}, [token]);
	useEffect(() => {
		try {
			if (token) {
				const getPayments = async () => {
					const res = await axios.get('/api/paymentsCheckout?limit=1000', { headers: { Authorization: token } });
					setPaymentsCheckouts(res.data);
				};
				getPayments();
			}
		} catch (error) {
			console.log(error);
		}
	}, [token]);

	return {
		paymentsCheckout: [paymentsCheckout, setPaymentsCheckout],
		paymentsCheckouts: [paymentsCheckouts, setPaymentsCheckouts],
	};
}

export default PaymentCheckoutApi;
