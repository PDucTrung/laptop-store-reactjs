import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
UserInfor.propTypes = {};

function UserInfor({ token }) {
	const params = useParams();
	const [user, setUser] = useState({});
	console.log(params);
	useEffect(async () => {
		const res = await axios.get(`/user/${params.id}`, {
			headers: { Authorization: token },
		});
		setUser(res.data);
	}, []);
	const changeStateAccount = async () => {
		if (
			window.confirm(
				user.state
					? 'Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không ?'
					: 'Bạn có chắc chắn muốn mở khóa tài khoản này không'
			)
		) {
			await axios.patch(
				`/user/update/${params.id}`,
				{ state: !user.state },
				{
					headers: { Authorization: token },
				}
			);
			setUser({ ...user, state: !user.state });
		} else {
			console.log(2);
		}
	};
	return (
		<div style={{ marginLeft: '20px', fontSize: '18px' }}>
			<p>Tên người dùng:{user.name}</p>
			<p>giới tính:{user.gender}</p>
			<p>Số điện thoại:{user.phone}</p>
			<p>Email:{user.email}</p>
			<p>Tạo ngày:{new Date(user.createdAt).toLocaleDateString()}</p>
			<button
				onClick={changeStateAccount}
				style={{
					backgroundColor: 'white',
					color: user.state ? 'red' : 'blue',
					padding: '5px',
					borderRadius: '5px',
					border: user.state ? '1px solid red' : '1px solid blue',
					cursor: 'pointer',
				}}
			>
				{user.state ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
			</button>
		</div>
	);
}

export default UserInfor;
