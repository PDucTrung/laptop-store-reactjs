import axios from 'axios';
import { useEffect, useState } from 'react';
function UserApi(token) {
	const [isLogined, setisLogined] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [cart, setCart] = useState([]);
	const [user, setUser] = useState();
	const [allUser, setAllUser] = useState();
	const [history, setHistory] = useState([]);
	useEffect(() => {
		try {
			if (token) {
				const getUser = async () => {
					const res = await axios.get('/user/infor', {
						headers: { Authorization: token },
					});

					setisLogined(true);
					res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

					setCart(res.data.cart);
					setUser(res.data);
				};
				getUser();
			}
		} catch (error) {
			alert(error.respon.data.mgs);
		}
	}, [token]);
	useEffect(() => {
		try {
			if (isAdmin) {
				const getAllUser = async () => {
					const res = await axios.get('/user/getall', {
						headers: { Authorization: token },
					});

					setAllUser(res.data);
				};
				getAllUser();
			}
		} catch (error) {
			alert(error.respon.data.mgs);
		}
	}, [isAdmin]);

	const addToCart = async (product) => {
		const check = cart.every((item) => {
			return item._id !== product._id;
		});

		if (check) {
			setCart([...cart, { ...product, quantity: 1 }]);
			await axios.patch(
				'/user/addcart',
				{
					cart: [...cart, { ...product, quantity: 1 }],
				},
				{ headers: { Authorization: token } }
			);
		} else {
			alert('Sản phẩm đã được thêm vào giỏ hàng.');
		}
	};
	return {
		isLogined: [isLogined, setisLogined],
		isAdmin: [isAdmin, setIsAdmin],
		cart: [cart, setCart],
		user: [user, setUser],
		allUser: [allUser, setAllUser],
		addToCart: addToCart,
		history: [history, setHistory],
	};
}

export default UserApi;
