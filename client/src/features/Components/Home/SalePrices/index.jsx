import { Paper, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import Soldest from './soldest';

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 4,
		slidesToSlide: 3, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

function SalePrice(props) {
	const state = useContext(ContextGlobal);
	const [allProduct] = state.productsAPI.allProduct;
	const { products } = allProduct;

	if (!products) return null;
	return (
		<Paper elevation={0} style={{ marginTop: '20px', padding: '20px',border:'1px solid #edeef5' }}>
			<Typography component="h2" variant="h4" className="font-dosis">
				Giá ưu đãi hôm nay
			</Typography>
			<Carousel
				responsive={responsive}
				containerClass="carousel-container"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				itemClass="carousel-item-padding-40-px"
				infinite={true}
				transitionDuration={1000}

			>
				{products?.map((item) => (item.salePercen > 1 ? <Soldest product={item} /> : null))}
			</Carousel>
		</Paper>
	);
}

export default SalePrice;
