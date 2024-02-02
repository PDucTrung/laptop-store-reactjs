import axios from 'axios';
import React, { useContext, useEffect, useRef } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import FormatUSDT from '../../../../utils/formatUSDT';
export default function Paypal({ value = 0, cart = [] }) {
	const paypal = useRef();
	const state = useContext(ContextGlobal);
	const [token] = state.token;

	const addToCart = async (cart) => {
		await axios.patch('/user/addcart', { cart }, { headers: { Authorization: token } });
	};

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'ordering',
								amount: {
									currency_code: 'USD',
									value: FormatUSDT(value),
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();

					const { id, payer, purchase_units } = order;

					const res = await axios.post(
						'/api/payment',
						{ cart, id, payer, purchase_units },
						{ headers: { Authorization: token } }
					);

					addToCart([]);
					alert(res.data.mgs);
					window.location.href = '/';
				},
				onError: (err) => {
					console.log(err);
				},
			})
			.render(paypal.current);
	}, [cart, value]);

	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
}
