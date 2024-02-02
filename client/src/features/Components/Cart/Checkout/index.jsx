import { Container, Grid, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import Enumeration from '../../../../utils/enum';
import StepOne from './stepOne';
import StepThree from './stepThree';
import StepTwo from './stepTwo';
CheckoutPayment.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return ['Chọn hình thức giao hàng', 'Địa chỉ giao hàng', 'Phương thức thanh toán'];
}

function CheckoutPayment() {
	const classes = useStyles();
	const steps = getSteps();
	const state = useContext(ContextGlobal);
	const [user] = state.userApi.user;
	const [token] = state.token;
	const [cart, setCart] = state.userApi.cart;
	const [derivery, setDerivery] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [userInfor] = state.userApi.user;
	
	const addToCart = async (cart) => {
		await axios.patch('/user/addcart', { cart }, { headers: { Authorization: token } });
	};

	console.log(cart, derivery, address, phone);
	const handleCreatePayment = async () => {
		const res = await axios.post(
			'/api/paymentsCheckout',
			{ cart, derivery, address, phone,state: Enumeration.INIT },
			{ headers: { Authorization: token } }
		);
		console.log(res);
		setCart([]);
		addToCart([]);
		alert(res.data.mgs);
		window.location.href = '/';
		await axios.post('/api/notifyUser', { userInfor, cart });

	};
	return (
		<Container className={classes.root}>
			<Stepper active>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					return (
						<Step active key={label} {...stepProps}>
							<StepLabel {...labelProps}>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Grid container style={{ marginTop: '20px' }}>
				<Grid item lg={12}>
					<Grid container style={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
						<Grid item lg={4}>
							<StepOne handleChange={(derivery) => setDerivery(derivery)} />
						</Grid>
						<Grid item lg={4}>
							<StepTwo
								address={address}
								phone={phone}
								handleChangeAddress={(address) => setAddress(address)}
								handleChangePhone={(phone) => setPhone(phone)}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item lg={12}>
					<StepThree cart={cart} handleChange={handleCreatePayment} />
				</Grid>
			</Grid>
		</Container>
	);
}

export default CheckoutPayment;
