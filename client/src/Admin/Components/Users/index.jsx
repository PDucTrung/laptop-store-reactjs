import React, { useContext } from 'react';
import { ContextGlobal } from './../../../app/ContextGlobal/index';
import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link, useHistory } from 'react-router-dom';

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

function Users(props) {
	const state = useContext(ContextGlobal);
	const history = useHistory();
	const classes = useStyles();
	const [users] = state.userApi.allUser;

	
		return (
			<Paper>
				<Container className={classes.root}>
					<Typography variant="h5" component="h2" style={{ padding: '15px' }}>
						Quản lý người dùng
					</Typography>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">User ID</TableCell>
									<TableCell align="center">User Name</TableCell>
									<TableCell align="center">Quyền hạn</TableCell>
									<TableCell align="center">Ngày tạo</TableCell>
									<TableCell align="center">Xem chi tiết</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users?.map((user) => (
									<TableRow key={user._id}>
										<TableCell component="th" scope="row" align="center">
											{user._id}
										</TableCell>
										<TableCell component="th" scope="row" align="center">
											{user.name}
										</TableCell>
										<TableCell component="th" scope="row" align="center">
											{user.role === 1 ? 'Admin' : 'người dùng'}
										</TableCell>

										<TableCell align="center">
											{new Date(user.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell align="center">
										<Link to={`user/details/${user._id}`}>
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
				</Container>
			</Paper>
		);
}

export default Users;
