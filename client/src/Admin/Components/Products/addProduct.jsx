import { Box, Button, Container, Grid, makeStyles, NativeSelect, Paper, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import Loading from '../../../features/Components/Process';
AddProduct.propTypes = {};

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '350px',
	},
	flex: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapfile: {
		position: 'relative',
	},
	input: {
		margin: theme.spacing(1, 0),
		maxWidth: '100%',
	},
	fileinput: {},
	images: {
		position: 'relative',
	},
	img: {
		maxWidth: '400px',
	},
	iconClear: {
		position: 'absolute',
		top: '0',
		right: '0',
		cursor: 'pointer',
		color: 'white',
	},
	select: {
		maxWidth: '150px',
		margin: theme.spacing(2, 0),
	},
}));
const initState = {
	product_id: '',
	title: '',
	price: 0,
	description: '',
	content: '',
	category: '',
	color: '',
	salePercent: 0,
	status:true,
};
function AddProduct(props) {
	const state = useContext(ContextGlobal);
	const [category] = state.categoryApi.category;
	const [isAdmin] = state.userApi.isAdmin;
	const [callback, setCallBack] = state.productsAPI.callback;
	const [products] = state.productsAPI.products;
	const [token] = state.token;
	const [images, setImages] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const params = useParams();

	//console.log(params);
	const classes = useStyles();
	const [product, setProduct] = useState(initState);
	useEffect(() => {
		if (params.id) {
			setIsEdit(true);
			products.forEach((item) => {
				if (item._id === params.id) {
					setProduct(item);
					setImages(item.images);
				}
			});
		} else {
			setIsEdit(false);
			setProduct(initState);
			setImages(false);
		}
	}, [params.id, products]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!isAdmin) return alert('Bạn không phải một admin');
			if (!images) return alert('Không có ảnh nào được upload');

			if (isEdit) {
				const res = await axios.put(
					`/api/products/${product._id}`,
					{ ...product, images },
					{ headers: { Authorization: token } }
				);
				// alert(res.data.msg);
			} else {
				await axios.post('/api/products', { ...product, images }, { headers: { Authorization: token } });
			}
			history.push('/admin/products');
			setCallBack(!callback);
		} catch (error) {
			const failr = error.response.data.msg;
			alert(failr);
		}
	};
	const handleImgChange = async (e) => {
		e.preventDefault();
		try {
			
			if (!isAdmin) return alert('Bạn không được phép thực hiện thao tác này.');
			const file = e.target.files[0];

			if (!file) return alert('File không tồn tại.');

			if (file.size > 1024 * 1024) return alert('Dung lượng ảnh vượt mức cho phép.');

			if (file.type !== 'image/jpeg' && file.type !== 'image/png') return alert('Ảnh sai định dạng.');

			let formData = new FormData();
			formData.append('file', file);
			setLoading(true);
			const res = await axios.post('/api/upload', formData, {
				headers: { 'content-type': 'multipart/form-data', Authorization: token },
			});

			setImages(res.data);
			setLoading(false);
		} catch (err) {
			const failr = err.response.data.msg;
			alert(failr);
		}
	};
	const handleRemoveImage = async (public_id) => {
		try {
			await axios.post('/api/destroy', { public_id }, { headers: { Authorization: token } });
			setImages(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Paper>
			<Container>
				<Grid container spacing={4} className={classes.flex}>
					<Grid className={classes.wrapfile} item lg={4}>
						<TextField
							type="file"
							name="file"
							required="true"
							className={classes.fileinput}
							onChange={handleImgChange}
						/>
						{loading ? (
							<Loading />
						) : (
							<Box className={classes.images}>
								<>
									<img className={classes.img} src={images ? images.url : ''} alt="img" />{' '}
									<ClearIcon
										className={classes.iconClear}
										onClick={() => handleRemoveImage(images.public_id)}
									/>
								</>
							</Box>
						)}
					</Grid>
					<Grid item lg={8} className={classes.flex}>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								type="text"
								name="product_id"
								required="true"
								label="Mã sản phẩm"
								onChange={handleChange}
								disabled={isEdit ? true : false}
								value={product.product_id}
								className={classes.input}
							/>
							<TextField
								type="text"
								name="title"
								required="true"
								label="Tên sản phẩm"
								onChange={handleChange}
								value={product.title}
								className={classes.input}
							/>
							<TextField
								type="number"
								name="price"
								required="true"
								label="Giá sản phẩm"
								onChange={handleChange}
								value={product.price}
								className={classes.input}
							/>

							<TextField
								type="text"
								name="content"
								multiline
								rows={4}
								required="true"
								label="Thông tin chi tiết"
								onChange={handleChange}
								value={product.content}
								className={classes.input}
							/>
							<TextField
								type="text"
								name="description"
								required="true"
								multiline
								rows={4}
								label="Miêu tả"
								onChange={handleChange}
								value={product.description}
								className={classes.input}
							/>
							<TextField
								type="number"
								name="salePercen"
								required="true"
								label="Phần trăm giảm giá"
								onChange={handleChange}
								value={product.salePercen}
								className={classes.input}
							/>
							<NativeSelect
								className={classes.select}
								onChange={handleChange}
								value={product.category}
								name="category"
							>
								<option value="">Chọn</option>
								{category.map((item) => (
									<option value={item.name}>{item.name}</option>
								))}
							</NativeSelect>
							<TextField
								type="number"
								name="remain"
								required="true"
								label="Số lượng còn"
								onChange={handleChange}
								value={product.remain}
								className={classes.input}
							/>
							<NativeSelect
								className={classes.select}
								onChange={handleChange}
								value={product.color}
								name="color"
							>
								<option value="">Chọn</option>
								<option value="do">Đỏ</option>
								<option value="xanh">Xanh</option>
								<option value="den">Đen</option>
								<option value="vang">Vàng</option>
								<option value="trang">Trắng</option>
								<option value="tim">Tím</option>
							</NativeSelect>
							<NativeSelect
								className={classes.select}
								onChange={handleChange}
								value={product.service}
								name="service"
							>
								<option value="">Chọn</option>
								<option value="isFreeShip">Miễn phí vận chuyển</option>
								<option value="flash">Giao hàng trong ngày</option>
								<option value="refuned">Rẻ hơn hoàn tiền</option>
							</NativeSelect>
							<Button type="submit" variant="contained" color="primary" style={{ marginTop: '15px' }}>
								{isEdit ? 'Cập nhật' : 'Tạo mới'}
							</Button>
						</form>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
}

export default AddProduct;
