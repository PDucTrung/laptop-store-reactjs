import { Button, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
const useStyles = makeStyles((theme) => ({
	root: {},
	img: {
		maxHeight: '651px',
		display: 'block',
		maxWidth: '485px',
		overflow: 'hidden',
		width: '100%',
	},
	column: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	box: {
		backgroundColor: 'white',
		padding: '50px',
	},
	title: {
		textTransform: 'capitalize',
		textAlign: 'left',
		marginLeft: '20px',
		padding: '0 20px',
		fontSize: '32px',
		width: '75%',
	},
	button: {
		marginTop: '15px',
	},
	arrowStyles: {
		position: 'absolute',
		zIndex: 2,
		top: 'calc(50% - 15px)',
		width: 30,
		height: 30,
		cursor: 'pointer',
	},

	indicatorStyles: {
		background: '#fff',
		width: 8,
		height: 8,
		display: 'inline-block',
		margin: '0 8px',
	},
}));

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};
function Banner() {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [slider] = state.productsAPI.slide;

	const history = useHistory();
	return (
		<div className={classes.root}>
			
			<Carousel
				responsive={responsive}
				containerClass="carousel-container"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				itemClass="carousel-item-padding-40-px"
				infinite={true}
				showDots={true}
				autoPlay={true}
				autoPlaySpeed={3000}
			>
				
				{slider.map((item) => (
					<Grid className={classes.box} container key={item._id}>
						<Hidden only={['xs', 'md', 'sm']}>
							<Grid className={classes.column} item lg={6}>
								<Typography className={classes.title} component="h2" variant="h2">
									{item.title}
								</Typography>
								<Button
									className={classes.button}
									onClick={() => history.push(`/products/${item.item_id.item_id}`)}
									color="secondary"
									variant="outlined"
								>
									Xem ngay
								</Button>
							</Grid>
						</Hidden>
						<Grid className={classes.column} item xs={12} sm={12} md={12} lg={6}>
							<img className={classes.img} src={item.images.url} alt="img" />
						</Grid>
					</Grid>
				))}		         
			</Carousel>
		</div>
	);
}

export default React.memo(Banner) ;
