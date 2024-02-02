import { Box, Grid } from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../app/ContextGlobal';
import FormatNumber from './../../../utils/formatNumber';
import CardCount from './Card/index';
import DoughnutChart from './Chart/DoughnutChart';
import LineChart from './Chart/LineChart';
import GroupData from './../../../utils/groupData';

DarshBoard.propTypes = {};

function DarshBoard({ paymentCheckOut = [] }) {
	const state = useContext(ContextGlobal);
	const [allProductSold] = state.productsAPI.allProductSold;
	const [allProduct] = state.productsAPI.allProduct;
	const [payments] = state.paymentApi.payments;
	const [allUser] = state.userApi.allUser;
	const [categories] = state.categoryApi.category;

	const array = [];
	const totalItem = [];
	payments.map((item) => {
		const { cart } = item;
		array.push(cart);
		totalItem.push(item);
	});
	paymentCheckOut.map((item) => {
		const { cart } = item;
		array.push(cart);
		totalItem.push(item);
	});
	const totalPrice = array.flat(Infinity).reduce((total, item) => {
		return (total += item.price * item.quantity);
	}, 0);

	const countUser = allUser?.filter((item) => item.role === 0);
	const flatarray = array.flat(Infinity);

	let arrayGroupByDate = GroupData(flatarray, 'category');
	const dataNumbers = Object.values(arrayGroupByDate).map((item) => item.reduce((total, i) => (total += i), 0));

	const data = [
		{
			backgroundcolor: 'linear-gradient(to right,#fe9365,#feb798)',
			id: 1,
			icon: <PeopleIcon />,
			title: 'Số người dùng',
			number: countUser?.length,
		},
		{
			backgroundcolor: 'linear-gradient(to right,#0ac282,#0df3a3)',
			id: 2,
			icon: <MonetizationOnIcon />,
			title: 'Tổng thu nhập',
			number: FormatNumber(totalPrice),
		},
		{
			backgroundcolor: 'linear-gradient(to right,#01a9ac,#01dbdf)',
			id: 3,
			icon: <ShoppingCartIcon />,
			title: 'Số đơn hàng',
			number: flatarray.length,
		},
		{
			backgroundcolor: 'linear-gradient(to right,#fe5d70,#fe909d)',
			id: 4,
			icon: <ListAltIcon />,
			title: 'Số sản phẩm',
			number: allProduct?.count,
		},
	];
	return (
		<Box>
			<Box style={{ display: 'flex' }}>
				<Grid container spacing={4}>
					{data.map((item) => (
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<CardCount
								backgroundcolor={item.backgroundcolor}
								icon={item.icon}
								title={item.title}
								number={item.number}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
			<Grid container spacing={3} style={{ marginTop: '30px' }}>
				<Grid item lg={8}>
					{/* <LineChart payments={paymentCheckOut} countpaypal={payments} /> */}
					<LineChart payments={totalItem} countpaypal={payments} />
				</Grid>
				<Grid item lg={4}>
					<DoughnutChart list={dataNumbers} labels={categories} />
				</Grid>
			</Grid>
		</Box>
	);
}

export default DarshBoard;
