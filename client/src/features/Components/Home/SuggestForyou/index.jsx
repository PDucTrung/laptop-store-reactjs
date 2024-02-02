import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import ProductItem from '../../Products/product';
import BtnLoadMore from './BtnLoadMore';
import FilterByCategory from './FillterByCategory';

SuggestForYou.propTypes = {};
const useStyles = makeStyles((theme) => ({
	width: {
		[theme.breakpoints.up('sm')]: {
			width: '20%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '25%',
		},
		[theme.breakpoints.down('md')]: {
			width: '33%',
		},
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
}));
function SuggestForYou(props) {
	const state = useContext(ContextGlobal);
	const [products] = state.productsAPI.productsLoadMore;
	const classes = useStyles();

	return (
		<Paper elevation={0} style={{ marginTop: '20px' }}>
			<Grid item style={{ padding: '20px' }}>
				<Typography component="h2" variant="h4">
					Gợi Ý Hôm Nay
				</Typography>
				<Box>
					{/* <FilterByCategory /> */}
					<Grid container spacing={0}>
						{products.map((product) => (
							<Grid className={classes.width} key={product._id} item xs={12} sm={4} md={3} lg={2}>
								<ProductItem product={product} />
							</Grid>
						))}
					</Grid>
					<BtnLoadMore />
				</Box>
			</Grid>
		</Paper>
	);
}

export default SuggestForYou;
