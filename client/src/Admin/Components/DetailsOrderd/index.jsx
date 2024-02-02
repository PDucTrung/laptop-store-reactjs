import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import formatNumber from '../../../utils/formatNumber';
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 0),
		marginTop: '20px',
	},

	img: {
		maxWidth: '100px',
	},
}));
function DetailsOrderd(props) {
	const classes = useStyles();
	const params = useParams();
	const state = useContext(ContextGlobal);
	const [payments] = state.paymentApi.payments;
	const [orderDetails, setOrderDetails] = useState([]);
	useEffect(() => {
		if (params.id) {
			payments.forEach((item) => {
				if (item._id === params.id) {
					setOrderDetails(item);
				}
			});
		}
	}, [params.id]);

	if (orderDetails.length === 0) return null;
	return (
		<Container>
			<Container className={classes.root}>
				<TableContainer component={Paper}>
					<Typography style={{ margin: '10px' }} component="h2" variant="h5">
						Thông tin khách hàng
					</Typography>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Tên người nhận</TableCell>
								<TableCell align="center">Địa chỉ</TableCell>
								<TableCell align="center">Mã bưu điện</TableCell>
								<TableCell align="center">Mã địa phương</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									{orderDetails.purchase_units[0].shipping.name.full_name}
								</TableCell>

								<TableCell align="center">
									{orderDetails.purchase_units[0].shipping.address.address_line_1 +
										' - ' +
										orderDetails.purchase_units[0].shipping.address.admin_area_1 +
										'-'}
								</TableCell>
								<TableCell align="center">
									{orderDetails.purchase_units[0].shipping.address.postal_code}
								</TableCell>
								<TableCell align="center">
									{orderDetails.purchase_units[0].shipping.address.country_code}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Typography style={{ margin: '20px 10px' }} component="h2" variant="h5">
						Thông tin sản phẩm
					</Typography>

					<Table style={{ margin: '30px 0px' }}>
						<TableHead>
							<TableCell>Ảnh sản phẩm</TableCell>
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
				</TableContainer>
			</Container>
		</Container>
	);
}

export default DetailsOrderd;
