import { Box, Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { default as React, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}
const useStyles = makeStyles((theme) => ({
	root: {},
	table: {
		minWidth: 650,
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
	input: {
		border: 'none',
		background: 'transparent',
		width: '35px',
		textAlign: 'center',
		fontSize: ' 13px',
		appearance: 'none',
		margin: '0px',
		height: '30px',
		borderTop: '1px solid rgb(200, 200, 200)',
		borderBottom: '1px solid rgb(200, 200, 200)',
		padding: ' 6px 12px',
	},
	img: {
		maxWidth: '130px',
	},
	spanbutton: {
		border: '1px solid rgb(200, 200, 200)',
		color: 'rgb(153, 153, 153)',
		padding: ' 6px 12px',
		cursor: 'pointer',
		height: '30px',
		width: '30px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '14px',
	},
	totalPricee: {
		color: 'rgb(254, 56, 52)',
		fontSize: '22px',
		fontWeight: '400',
		'& > nth:child(first-child)': {
			borderTop: '1px solid rgb(200, 200, 200)',
		},
	},
	leftcol: {},
	rightcol: {
		[theme.breakpoints.down('md')]: {
			marginTop: '15px',
		},
	},
}));

function Ordered(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [payments] = state.paymentApi.payments;
	const [token] = state.token;
	const [page, setPage] = useState(1);
	const [currentPayments, setCurrentPayments] = useState([]);
	useEffect(() => {
		try {
			const getpayment = async () => {
				const res = await axios.get(`/api/payment?page=${page}`, { headers: { Authorization: token } });
				setCurrentPayments(res.data.payments);
			};
			getpayment();
		} catch (error) {
			console.log(error);
		}
	}, [page]);
	return (
		<div>
			<Container className={classes.root}>
				<Typography variant="h5" component="h2" style={{ padding: '15px' }}>
					Quản lý đơn hàng
				</Typography>
				<Typography variant="subtitile2" component="span" style={{ padding: '15px' }}>
					Số đơn hàng({payments.length})
				</Typography>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Payment ID</TableCell>
								<TableCell align="center">Ngày đặt hàng</TableCell>
								<TableCell align="center">Xem chi tiết</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentPayments.map((item) => (
								<TableRow key={item._id}>
									<TableCell component="th" scope="row" align="center">
										{item._id}
									</TableCell>

									<TableCell align="center">
										{new Date(item.createdAt).toLocaleDateString()}
									</TableCell>
									<TableCell align="center">
										<Link to={`ordered/${item._id}`}>
											<Button color="primary" variant="contained">
												Xem
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box style={{ display: 'flex', justifyContent: 'flex-end', margin: '15px 15px 0 0' }}>
					<Pagination
						count={Math.ceil(payments.length / 9)}
						page={page}
						onChange={(e, value) => setPage(value)}
						variant="outlined"
						color="primary"
					/>
				</Box>
			</Container>
		</div>
	);
}

export default Ordered;
