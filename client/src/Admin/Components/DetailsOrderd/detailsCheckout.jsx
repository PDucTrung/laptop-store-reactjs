import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import formatNumber from '../../../utils/formatNumber';
import Enumeration from './../../../utils/enum';
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 0),
		marginTop: '20px',
	},

	img: {
		maxWidth: '100px',
	},
}));
function DetailsOrderdCheckout({ paymentsCheckOut = [], token, aftersubmit }) {
	const classes = useStyles();
	const params = useParams();
	const toast = useRef(null);

	const [orderDetails, setOrderDetails] = useState([]);
	const [reason, setReason] = useState();

	useEffect(() => {
		if (params.id) {
			paymentsCheckOut.forEach((item) => {
				if (item._id === params.id) {
					setOrderDetails(item);
				}
			});
		}
	}, [params.id]);
	const changeState = async (state) => {
		try {
			const res = await axios.put(
				`/api/paymentsCheckout/${orderDetails._id}`,
				{ ...orderDetails, state, reason },
				{ headers: { Authorization: token } }
			);
			const _arr = [...paymentsCheckOut];
			for (let i = 0; i < _arr.length; i++) {
				if (_arr[i]._id === orderDetails._id) {
					_arr[i] = res.data;
				}
			}
			setOrderDetails(res.data);
			aftersubmit(_arr);
		alert('Thao tác thành công');
		} catch (error) {
			console.log(error);
		}
	};

	if (orderDetails.length === 0) return null;
	return (
		<Container className={classes.root}>
			<TableContainer component={Paper}>
			
				<Typography style={{ margin: '10px' }} component="h2" variant="h5">
					Thông tin khách hàng
				</Typography>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Tên</TableCell>
							<TableCell align="center">Địa chỉ</TableCell>
							<TableCell align="center">Hình thức giao hàng</TableCell>
							<TableCell align="center">Số điện thoại</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								{orderDetails.name}
							</TableCell>
							<TableCell align="center">{orderDetails.address}</TableCell>
							<TableCell align="center">
								{orderDetails.derivery === 'tietkiem' ? 'Tiết kiệm' : 'Siêu tốc'}
							</TableCell>
							<TableCell align="center">{orderDetails.phone}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Typography style={{ margin: '20px 10px' }} component="h2" variant="h5">
					Thông tin sản phẩm
				</Typography>

				<Table style={{ margin: '30px 0px' }}>
					<TableHead>
						<TableCell>Hình ảnh sản phẩm</TableCell>
						<TableCell align="center">Tên sản phẩm</TableCell>
						<TableCell align="center">Loại sản phẩm</TableCell>
						<TableCell align="center">Số lượng</TableCell>
						<TableCell align="center">Giá</TableCell>
					</TableHead>
					<TableBody>
						{orderDetails.cart.map((item) => (
							<TableRow key={item._id}>
								<TableCell>
									<img className={classes.img} src={item.images.url} alt="" />
								</TableCell>
								<TableCell align="center">{item.title}</TableCell>
								<TableCell align="center">{item.category}</TableCell>
								<TableCell align="center">{item.quantity}</TableCell>
								<TableCell align="center">{formatNumber(item.price * item.quantity)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{orderDetails.state === Enumeration.INIT && (
					<div style={{display:'flex'}}>
						<button
							onClick={() => changeState(Enumeration.APPROVE)}
							style={{
								padding: '5px',
								backgroundColor: 'white',
								color: 'blue',
								border: '1px solid blue',
								borderRadius: '5px',
							}}
						>
							Xác nhận đơn hàng
						</button>
						<button
							onClick={() => changeState(Enumeration.CANCEL)}
							style={{
								padding: '5px',
								backgroundColor: 'white',
								color: 'red',
								border: '1px solid red',
								borderRadius: '5px',
								margin:'0 10px'
							}}
						>
							Hủy đơn hàng
						</button>
						<textarea placeholder="Lý do" onChange={(e) => setReason(e.target.value)}></textarea>
					</div>
				)}
				{orderDetails.state === Enumeration.APPROVE && (
					<button
						onClick={() => changeState(Enumeration.SUCCESS)}
						style={{
							padding: '5px',
							backgroundColor: 'white',
							color: 'green',
							border: '1px solid green',
							borderRadius: '5px',
						}}
					>
						Giao hàng thành công
					</button>
				)}
			</TableContainer>
		</Container>
	);
}

export default DetailsOrderdCheckout;
