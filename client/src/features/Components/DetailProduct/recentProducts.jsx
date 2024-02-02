import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from '../Products/product';

// const responsive = {
// 	desktop: {
// 		breakpoint: { max: 3000, min: 1024 },
// 		items: 1,
// 		slidesToSlide: 1, // optional, default to 1.
// 	},
// 	tablet: {
// 		breakpoint: { max: 1024, min: 464 },
// 		items: 1,
// 		slidesToSlide: 1, // optional, default to 1.
// 	},
// 	mobile: {
// 		breakpoint: { max: 464, min: 0 },
// 		items: 1,
// 		slidesToSlide: 1, // optional, default to 1.
// 	},
// };
export default function RecentProducts({ products = [], product }) {
	return (
		<Paper style={{ height: '370px', padding: '15px' }}>
			<Grid container spacing={2} style={{ display: 'felx', flexWrap: 'nowrap', overflow: 'auto' }}>
				{products.map((products) =>
					products.category === product.category ? (
						<Grid item>
							<ProductItem key={products._id} product={products} />
						</Grid>
					) : null
				)}
			</Grid>
		</Paper>
	);
}
