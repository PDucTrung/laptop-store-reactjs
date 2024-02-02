import { Box, Button, Checkbox, Container, Grid, NativeSelect, Switch, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal/index';
import Loading from '../../../features/Components/Process';

Products.propTypes = {};
const useStyles = makeStyles({
	table: {
		width: '100%',
	},
	img: {
		maxWidth: '50px',
	},
	box: { display: 'flex', justifyContent: 'space-between' },
	button: {
		backgroundColor: '#01a9ac',
		color: 'white',
		marginTop: '15px',
		'&:hover': {
			backgroundColor: '#01dbdf',
		},
	},
	buttonRemove: {
		width: '100px',
	},
	buttonedit: {
		backgroundColor: 'orange',
		color: 'white',
		'&:hover': {
			backgroundColor: 'gray',
		},
	},
	select: {
		margin: '15px 0',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
});

function Products(props) {
	const state = React.useContext(ContextGlobal);
	const [products, setProducts] = state.productsAPI.products;
	const [callback, setCallBack] = state.productsAPI.callback;
	const [page, setPage] = state.productsAPI.page;
	const [category, setCategory] = state.productsAPI.category;
	const [allProduct] = state.productsAPI.allProduct;
	const [token] = state.token;
	const [ischecked, setIsChecked] = useState(false);
	const [checked, setchecked] = useState(false);
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleRemove = async (id, public_id) => {
		try {
			if(window.confirm("Bạn có chắc muốn xóa sản phẩm này ?")){

				const destroy = axios.post('/api/destroy', { public_id }, { headers: { Authorization: token } });
				const res = axios.delete(`/api/products/${id}`, { headers: { Authorization: token } });
	
				await destroy;
				await res;
				setCallBack(!callback);
			}
		} catch (error) {
			const failr = error.response.data.msg;
			alert(failr);
		}
	};
	const handleChange = (id) => {
		products.forEach((item) => {
			if (item._id === id) {
				item.checked = !item.checked;
				setchecked(item.checked);
			}
		});
		setProducts([...products]);
	};
	const handleCheckAll = () => {
		products.forEach((item) => {
			item.checked = !ischecked;
			setchecked(item.checked);
		});
		setProducts([...products]);
		setIsChecked(!ischecked);
	};
	const handleRemoveAll = () => {
		products.forEach((item) => {
			if (item.checked) handleRemove(item._id, item.images.public_id);
		});
	};
	const handleChangStatus = async (e, id) => {
		try {
			const { checked } = e.target;
			setLoading(true);
			await axios.patch('/api/products', { id, status: checked });
			setCallBack(!callback);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) return <Loading />;
	return (
		<Paper>
			<Container>
				<Typography variant="h5" component="h2" style={{ padding: '15px 0' }}>
					Quản lý sản phẩm({allProduct.count})
				</Typography>
				<Grid container>
					<Grid item style={{ width: '100%' }}>
						<Box className={classes.box}>
							<Tooltip title="Xóa những mục được chọn">
								<Button
									variant="contained"
									className={classes.buttonRemove}
									color="secondary"
									onClick={handleRemoveAll}
									startIcon={<DeleteIcon />}
									disabled={!checked}
								>
									Xóa
								</Button>
							</Tooltip>

							<Button
								variant="contained"
								className={classes.button}
								startIcon={<AddIcon />}
								onClick={() => history.push('addproduct')}
							>
								Thêm mới
							</Button>
						</Box>
						<Box className={classes.select}>
							<Typography variant="body1" component="span" style={{ marginRight: '15px' }}>
								Lọc theo mặt hàng
							</Typography>
							<NativeSelect
								onChange={handleChange}
								value={category}
								name="category"
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="">Chọn</option>
								<option value="category=Laptop">Laptop</option>
								<option value="category=Ổ cứng">Ổ cứng</option>
								<option value="category=RAM">RAM</option>
								<option value="category=Phụ kiện">Phụ kiện</option>
								<option value="category=Tai nghe">Tai nghe</option>
							</NativeSelect>
						</Box>
						<TableContainer>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>
											Chọn
											<Checkbox checked={ischecked} onChange={handleCheckAll} />
										</TableCell>
										<TableCell>Tên</TableCell>
										<TableCell align="center">Ảnh</TableCell>

										<TableCell align="center">Giá</TableCell>
										<TableCell align="center">Tình trạng</TableCell>
										<TableCell align="center">Giảm giá</TableCell>
										<TableCell align="center">Đã bán</TableCell>
										<TableCell colSpan="2" align="center">
											Thao tác
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.map((row) => (
										<TableRow key={row.name}>
											<TableCell>
												<Checkbox
													checked={row.checked}
													onChange={() => handleChange(row._id)}
												/>
											</TableCell>
											<TableCell component="th" scope="row">
												{row.title}
											</TableCell>
											<TableCell align="center">
												<img className={classes.img} src={row.images.url} alt="" />
											</TableCell>

											<TableCell align="center">{row.price}</TableCell>
											<TableCell align="center">
												{row.remain}
											</TableCell>
											<TableCell align="center">{row.salePercen}</TableCell>
											<TableCell align="center">{row.sold}</TableCell>
											<TableCell align="center">
												<Link to={`${row._id}`}>
													<Tooltip title="Delete">
														<IconButton aria-label="delete">
															<EditIcon />
														</IconButton>
													</Tooltip>
												</Link>
											</TableCell>
											<TableCell align="center">
												<Tooltip title="Delete">
													<IconButton aria-label="delete">
														<DeleteIcon
															style={{ cursor: 'pointer' }}
															onClick={() => handleRemove(row._id, row.images.public_id)}
														/>
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			</Container>
			<Box style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination
					count={Math.ceil(allProduct.count / 9)}
					color="primary"
					page={page}
					onChange={(e, value) => setPage(value)}
				/>
			</Box>
		</Paper>
	);
}

export default Products;
