import { Container } from '@material-ui/core';
import React from 'react';
import Banner from '../Banner';
import ItemCategory from './ItemCategory';
import SalePrice from './SalePrices';
import SuggestForYou from './SuggestForyou';
import Thumbnails from './Thumnails';
import TopTrending from './TopTrendingCate';

HomePage.propTypes = {};

function HomePage(props) {
	return (
		<>
			<Banner />
			<Container>
				<Thumbnails />
				<ItemCategory />
				<TopTrending />
				<SalePrice />
				<SuggestForYou />
			</Container>
		</>
	);
}

export default HomePage;
