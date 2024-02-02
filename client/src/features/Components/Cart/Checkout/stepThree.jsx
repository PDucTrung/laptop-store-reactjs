import { Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import FormatNumber from './../../../../utils/formatNumber';
import FormatUSD from './../../../../utils/formatUSD';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 0),
		marginTop: '20px',
	},
	flex: { display: 'flex' },
	flexbetween: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing(2, 0),
	},
	originalPric: {
		color: theme.palette.grey[600],
	},
	promotion: {
		marginLeft: theme.spacing(2),
	},
	padding: {
		padding: theme.spacing(2),
	},
	button: {
		cursor: 'pointer',
		margin: theme.spacing(0, 1),
	},

	img: {
		maxWidth: '50px',
	},

	totalPricee: {
		color: 'rgb(254, 56, 52)',
		fontSize: '22px',
		fontWeight: '400',
		'& > nth:child(first-child)': {
			borderTop: '1px solid rgb(200, 200, 200)',
		},
	},
	rightcol: {
		[theme.breakpoints.down('md')]: {
			marginTop: '15px',
		},
	},
}));
function Stepthree({ value = {}, handleChange }) {
	const state = useContext(ContextGlobal);
	const [cart, setCart] = state.userApi.cart;
	const [token] = state.token;
	const [totalPrice, setTotalPrice] = useState(0);
	//console.log(cart);

	const classes = useStyles();

	useEffect(() => {
		const getTotal = () => {
			const total = cart.reduce((total, item) => {
				return (total += item.quantity * item.price);
			}, 0);
			setTotalPrice(total);
		};
		getTotal();
	}, [cart]);

	return (
		<Box className={classes.root}>
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={12} lg={8} className={classes.leftcol}>
						<Paper className={classes.padding}>
							<Box>
								{cart.length > 0 ? (
									cart.map((product) => (
										<Box
											className={classes.flex}
											justifyContent="space-between"
											padding="9px 0"
											component="li"
											key={product._id}
											style={{
												borderBottom: '1px solid #eee',
											}}
										>
											<img className={classes.img} src={product.images.url} alt="anh product" />
											<Box>
												<Typography variant="body2">{product.title}</Typography>
											</Box>
											<Box>
												<Box>
													<Box className={classes.flex}>
														<Typography variant="caption" className={classes.originalPric}>
															{FormatNumber(product.price * product.quantity)}
														</Typography>
														{product.salePercen > 0 ? (
															<Typography
																className={classes.promotion}
																variant="body2"
															>{`| -${product.salePercen}%`}</Typography>
														) : (
															''
														)}
													</Box>
												</Box>
												<Box></Box>
											</Box>
										</Box>
									))
								) : (
									<Typography>Không có sản phẩm nào trong giỏ hàng</Typography>
								)}
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} lg={4} className={classes.rightcol}>
						<Paper className={classes.padding}>
							<Box>
								<Box className={classes.flexbetween}>
									<Typography variant="body2">Tạm tính :</Typography>
									<Typography variant="body2">
										{totalPrice > 0 ? FormatNumber(totalPrice) : 0}
									</Typography>
								</Box>
								<Box className={classes.flexbetween}>
									<Typography variant="body2">Thành Tiền :</Typography>
									<Typography className={classes.totalPricee} variant="body2">
										{totalPrice > 0 ? FormatNumber(totalPrice) : 0}
									</Typography>
								</Box>
								<Typography textAlign="right" variant="caption" gutterBottom>
									(Đã bao gồm VAT nếu có)
								</Typography>
							</Box>
							<Box></Box>
						</Paper>
						<Button
							style={{ marginTop: '10px' }}
							variant="contained"
							color="secondary"
							onClick={handleChange}
						>
							Tiến hành đặt hàng
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Stepthree;
