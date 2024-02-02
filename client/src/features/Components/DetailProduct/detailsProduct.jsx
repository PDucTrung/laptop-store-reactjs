import { Box, Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import FormatNumber from '../../../utils/formatNumber';
import BreadCrumb from '../BreadCrumb';
import Services from '../Service';
import RecentProducts from './recentProducts';
import Comment from './../Comment/comment';
import ListComment from './../Comment/listcomment';
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '50px',
		marginBottom: '50px',
	},
	box: {
		padding: theme.spacing(3),
	},
	infor: {
		[theme.breakpoints.up('sm')]: {
			marginLeft: '15px',
			fontSize: '16px',
		},
		display: 'flex',
		justifyContent: 'space-between',
		height: '100%',
		flexDirection: 'column',
	},
	flex: {
		display: 'flex',
		alignItems: 'center',
	},
	title: {
		textTransform: 'capitalize',
		fontWeight: '600',
		[theme.breakpoints.down('xs')]: {
			fontSize: '24px',
		},
	},
	price: {
		fontWeight: '600',
		fontSize: theme.spacing(4),
		margin: theme.spacing(2, 0),
		color: '#2a2a86',
	},
	description: {
		margin: theme.spacing(2, 0),
		lineHeight: '30px',
		padding: '20px',
		fontWeight: '400',
		[theme.breakpoints.down('xs')]: {
			fontSize: '24px',
		},
	},
	pricepercen: {
		marginLeft: '10px',
		fontSize: theme.spacing(2),
		margin: theme.spacing(2, 0),
	},
	originPrice: {
		fontSize: '12px',
		textDecoration: 'line-through',
		margin: '0 5px',
	},
	wrap_img: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			margin: '10px',
		},
	},
	img: {
		maxWidth: '444px',
		maxHeight: '444px',
		margin: 'auto',
		[theme.breakpoints.down('xs')]: {
			maxWidth: '100%',
		},
	},
	wap: {
		margin: theme.spacing(2, 0),
	},
	content: {
		marginTop: '50px',
		padding: '20px',
	},
	wrap_price: {
		backgroundColor: '#fafafa',
		borderRadius: '5px',
		margin: '10px 0',
	},
	status: {
		width: '50px',
		height: '50px',
		color: '#00b853',
		borderRadius: '5px',
		padding: '5px',
		backgroundColor: '#e5f8ed',
	},
	button: {
		[theme.breakpoints.up('sm')]: {
			maxWidth: '200px',
		},
		padding: '10px',
		borderRadius: '15px',
	},
	category: {
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));
function DetailsProduct() {
	const data = useContext(ContextGlobal);
	const [products] = data.productsAPI.products;
	const [allProduct] = data.productsAPI.allProduct;
	const [isLogined] = data.userApi.isLogined;
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;
	const [comments, setcomments] = useState([]);
	const params = useParams();
	const [product, setProduct] = useState([]);
	const [color, setColor] = useState('');
	const classes = useStyles();
	let isService = '';
	const addCart = data.userApi.addToCart;

	useEffect(() => {
		if (params.id) {
			try {
				const getItem = async () => {
					const res = await axios.get(`/api/products/${params.id}`);
					let comments = await axios.get(`/api/comment/${params.id}?page=1&`);

					setcomments(comments.data);
					setProduct(res.data);
				};
				getItem();
			} catch (error) {
				console.log(error);
			}
		}
	}, [params.id, products]);
	function forhtmlContent() {
		return { __html: product.content };
	}
	function forhtmlDescription() {
		return { __html: product.description };
	}
	const afterSubmit = (data) => {
		const _data = { ...comments };
		_data.comments = [data, ...comments.comments];
		console.log(data);
		console.log(_data)
		setcomments(_data);
	};
	const addToCart = () => {
		if (product.remain <=0) {
			alert("Sản phẩm này hiện hết hàng vui lòng quai lại sau !")
		} else if (!isLogined) {
				alert('Vui lòng đăng nhập để thực hiện thao tác này.');
		} else {
				addCart(product);
			}
	};
	const match = useRouteMatch();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [match.url]);
	if (product.length === 0) return null;
	else
		return (
			<Box style={{ backgroundColor: '#F7F8FD' }}>
				<Container className={classes.root}>
					<BreadCrumb str={match.url} title={product.title} />
					<Paper elevation={0} className={classes.box}>
						<Grid container>
							<Grid className={classes.wrap_img} item xs={12} sm={12} md={6} lg={6}>
								<img className={classes.img} src={product.images.url} alt="" />
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={6}>
								<Box className={classes.infor}>
									<Typography
										className={clsx(classes.title, 'font-inter')}
										component="h2"
										variant="h4"
									>
										{product.title}
									</Typography>
									<Typography className={classes.sold} component="p" variant="body1">
										{product.sold > 0 ? `Đã bán ${product.sold} ` : ''}
									</Typography>
									<Typography className={classes.sold} component="p" variant="body1">
										{product.remain > 0 ? `Còn ${product.remain} ` : ''}
									</Typography>

									<Typography className={classes.sold} component="p" variant="body1">
										Tình trạng:
										<Typography className={classes.status} component="span" variant="body1">
											{product.remain>0 ? 'Còn hàng' : 'Hết hàng'}
										</Typography>
									</Typography>
									<Typography
										className={clsx(classes.flex, classes.wrap_price)}
										component="p"
										variant="body1"
									>
										<Typography
											component="span"
											variant="body2"
											className={clsx(classes.price, 'font-dosis')}
										>
											{FormatNumber(product.price)}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
											className={classes.originPrice}
										>
											{product.salePercen > 0
												? FormatNumber(
													product.price * (product.salePercen / 100) + product.price
												)
												: ''}
										</Typography>
										<Typography component="span" variant="body2" className={classes.pricepercen}>
											{product.salePercen > 0 ? `-${product.salePercen}%` : ''}
										</Typography>
									</Typography>
									<Typography>{isService}</Typography>
									<Button
										className={classes.button}
										variant="contained"
										color="secondary"
										onClick={addToCart}
									>
										Chọn mua
									</Button>
									<Typography className={classes.category} component="p" variant="body1">
										<Link
											to="/products"
											onClick={() => setCategory('category=' + product.category)}
										>
											{' '}
											Loại:{product.category}
										</Link>
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Paper>

					<Grid lg={10}>
						<Box className={classes.content}>
							<h2>THÔNG TIN CHI TIẾT</h2>
							<Paper>
								<Grid container>
									<div className={classes.description} dangerouslySetInnerHTML={forhtmlContent()} />
								</Grid>
							</Paper>
						</Box>
					</Grid>

					<Grid lg={10}>
						<Box className={classes.content}>
							<h2>MÔ TẢ SẢN PHẨM</h2>
							<Paper>
								<Grid container>
									<Typography className={classes.description} component="p" variant="body1">
										<div
											className={clsx('font-inter', classes.isdescription)}
											dangerouslySetInnerHTML={forhtmlDescription()}
										/>
									</Typography>
								</Grid>
							</Paper>
							<ListComment logined={isLogined} comments={comments} />
							{isLogined && <>
								<Comment product={product} state={state} afterSubmit={afterSubmit} />
							</>}
						</Box>
					</Grid>
					<Box>


						<Services />
					</Box>
					<Box>
						<h2 className={classes.wap}>Sản phẩm tương tự</h2>
						<RecentProducts products={allProduct.products} product={product} />
					</Box>
				</Container>
			</Box>
		);
}

export default DetailsProduct;
