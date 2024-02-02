import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ContextGlobal } from './../../../../app/ContextGlobal/index';
import { Link } from 'react-router-dom';

Thumbnails.propTypes = {};

const useStyles = makeStyles((theme) => ({
	root: {},
	box: {
		position: 'relative',
		borderRadius: '15px',
		overflow: 'hidden',
		marginTop: '30px',
	},
	wrap: {
		[theme.breakpoints.down('sm')]: {
			overflow: 'hidden',
		},
	},
	img: {
		borderRadius: '15px',
	},
	text: {
		position: 'absolute',
		top: '15%',
		left: '5%',
		padding: '1.875rem 2.5rem',
	},
	discount: {
		color: '#FF6048',
		fontFamily: 'Dosis sans-serif',
		fontWeight: '600',
	},
	btn: {
		padding: '5px 10px',
		borderRadius: '15px',
	},
}));
function Thumbnails(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;
	return (
		<Container>
			<Grid container spacing={4} className={classes.root}>
				<Grid item xs={12} sm={12} md={6} lg={6} className={classes.box}>
					<Box className={classes.wrap}>
						<img
							className={classes.img}
							src="https://res.cloudinary.com/drijkcrst/image/upload/v1650619135/DTComputer/07_Marce05cc8cdcadf28623b56e534d7fc359_v5zcaf.jpg"
							alt="imgthumbnails"
						/>
						<Box className={classes.text}>
							<Typography className={classes.discount} variant="h5" component="h4">
								Giảm giá 40%
							</Typography>
							<br/>
							<Link to="/products">
								<Button
									className={classes.btn}
									variant="contained"
									color="primary"
									onClick={() => setCategory('category=dauhat')}
								>
									Mua ngay
								</Button>
							</Link>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} className={classes.box}>
					<Box className={classes.wrap}>
						<img
							className={classes.img}
							src="https://res.cloudinary.com/drijkcrst/image/upload/v1650618920/DTComputer/26_Janf438c65647535d72c07ad15b5e2b91b9_tjg1dq.jpg"
							alt="imgthumbnails"
						/>
						<Box className={classes.text}>
							<Typography className={classes.discount} variant="h5" component="h4">
								Giảm giá 30%
							</Typography>
							<br/>
							<Link to="/products">
								{' '}
								<Button
									className={classes.btn}
									variant="contained"
									color="primary"
									onClick={() => setCategory('category=douong')}
								>
									Mua ngay
								</Button>
							</Link>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Thumbnails;
