import { Box, Button, Checkbox, Container, Grid, NativeSelect, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { ContextGlobal } from '../../../app/ContextGlobal/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
Slider.propTypes = {};
const useStyles = makeStyles({
	table: {
		width: '100%',
	},
	img: {
		maxWidth: '50px',
	},
	box: { display: 'flex', justifyContent: 'space-between' },
	button: {
		backgroundColor: 'green',
		color: 'white',
		marginTop: '15px',
	},
	buttonRemove: {
		width: '200px',
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

function Slider(props) {
	const state = React.useContext(ContextGlobal);
	const [products, setProducts] = state.productsAPI.products;
	const [slide] = state.productsAPI.slide;
	const [callback, setCallBack] = state.productsAPI.callback;
	const [page, setPage] = state.productsAPI.page;
	const [category, setCategory] = state.productsAPI.category;
	const [allProduct] = state.productsAPI.allProduct;
	const [ischecked, setIsChecked] = useState(false);
	const [checked, setchecked] = useState(false);
	const [selectSlide, setSelectSlide] = useState('');
	const classes = useStyles();
	const handleAddSlider = async (item, item_id) => {
		try {
			const { product_id, title, images } = item;
			await axios.post('/api/slider', { product_id, title, images, item_id });
			setCallBack(!callback);
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
	const handleAddtoSlider = () => {
		products.forEach((item) => {
			if (item.checked) handleAddSlider(item, { item_id: item._id });
		});
	};
	const customRenderThumb = () =>
		slide.map((item) => {
			return <img src={item.images.url} />;
		});
	

	const handleRemoveSlider = async () => {
		try {
			const res = await axios.delete(`/api/slider/${selectSlide}`);
			alert(res.data.mgs);
			setCallBack(!callback);
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeItem = (index, item) => {
		setSelectSlide(slide[index]._id);
		// console.log(selectSlide.item_id.item_id);
	};
	return (
		<>
			<Container>
				<Typography variant="h5" component="h2" style={{ padding: '15px 0' }}>
					Quản lý slide
				</Typography>
				<Typography variant="subtitle1" component="p">
					Số lượng({slide.length})
				</Typography>
				<Carousel
					renderThumbs={customRenderThumb}
					onChange={(index, item) => handleChangeItem(index, item)}
					showStatus={false}
				>
					{slide.map((item) => (
						<Grid style={{ display: 'none' }} className={classes.box} container key={item._id}>
							<Grid className={classes.column} item xs={12} sm={12} md={12} lg={6}>
								<img className={classes.img} src={item.images.url} />
							</Grid>
						</Grid>
					))}
				</Carousel>
				<Grid container>
					<Grid item style={{ width: '100%' }}>
						<Box className={classes.box}>
							<Button
								variant="contained"
								className={clsx(classes.buttonRemove, classes.button)}
								onClick={handleAddtoSlider}
								disabled={!checked}
							>
								Thêm vào slide
							</Button>
							<Button
								variant="contained"
								className={clsx(classes.buttonRemove, classes.button)}
								onClick={handleRemoveSlider}
							>
								Xóa khỏi slide
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
						<Paper>
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
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
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
		</>
	);
}

export default Slider;
