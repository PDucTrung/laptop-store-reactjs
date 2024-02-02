import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { default as React, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import  Enumeration  from '../../../utils/enum';
OderHistory.propTypes = {};

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 0),
		marginTop: '20px',
	},
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
function OderHistory(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [token] = state.token;
	const [history, setHistory] = state.userApi.history;
	useEffect(() => {
		if (token) {
			const getHistory = async () => {
				const res = await axios.get('/user/history', {
					headers: { Authorization: token },
				});
				setHistory(res.data);
			};
			getHistory();
		}
	}, [token, setHistory]);

	if (history.length === 0) {
		return (
			<Typography component="h3" variant="h3">
				Bạn chưa mua sản phẩm nào
			</Typography>
		);
	}
	return (
		<Container className={classes.root}>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Payment ID</TableCell>
							<TableCell align="center">Ngày đặt hàng</TableCell>
							<TableCell align="center">Xem chi tiết</TableCell>
							<TableCell align="center">Trạng thái</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{history.map((item) => (
							<TableRow key={item._id}>
								<TableCell component="th" scope="row" align="center">
									{item.paymentID}
								</TableCell>

								<TableCell align="center">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
								<TableCell align="center">
									<Link to={`/history/details/${item._id}`}>
										<Button color="primary" variant="contained">
											Xem
										</Button>
									</Link>
								</TableCell>
								<TableCell align="center">
									<Button color="primary" variant="contained">
										{Enumeration.states.find((item) => item.code === item.state)?.name}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default OderHistory;
