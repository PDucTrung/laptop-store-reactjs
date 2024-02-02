import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryApi from '../api/categoryApi';
import PaymentApi from '../api/paymentApi';
import PaymentCheckoutApi from '../api/paymentsCheckoutApi';
import ProductsApi from '../api/productsApi';
import UserApi from '../api/userApi';

export const ContextGlobal = React.createContext();

const ProviderContext = ({ children }) => {
	const [token, setToken] = useState(false);

	useEffect(() => {
		try {
			const firstLogin = localStorage.getItem('firstlogin');
			if (firstLogin) {
				const refreshToken = async () => {
					const res = await axios.get('/user/refresh_token');
					setToken(res.data.accesstoken);
					setTimeout(() => {
						refreshToken();
					}, 10 * 60 * 1000);
				};
				refreshToken();
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	const data = {
		token: [token, setToken],
		productsAPI: ProductsApi(),
		userApi: UserApi(token),
		categoryApi: CategoryApi(),
		paymentApi: PaymentApi(token),
		paymentCheckOutApi: PaymentCheckoutApi(token),
	};

	return <ContextGlobal.Provider value={data}>{children}</ContextGlobal.Provider>;
};
export default ProviderContext;
