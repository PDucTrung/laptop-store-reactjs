import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { ContextGlobal } from './../../../../app/ContextGlobal/index';
TopTrending.propTypes = {};

// const responsive = {
// 	desktop: {
// 		breakpoint: { max: 3000, min: 1024 },
// 		items: 6,
// 		slidesToSlide: 3, // optional, default to 1.
// 	},
// 	tablet: {
// 		breakpoint: { max: 1024, min: 464 },
// 		items: 4,
// 		slidesToSlide: 3, // optional, default to 1.
// 	},
// 	mobile: {
// 		breakpoint: { max: 464, min: 0 },
// 		items: 1,
// 		slidesToSlide: 1, // optional, default to 1.
// 	},
// };
const data = [
	{
		id: 1,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650613761/DTComputer/z3mwhixg2auwampp2f0s.jpg',
		title: 'Laptop',
		category:'Laptop'
	},
	{
		id: 2,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650616844/DTComputer/20829_pc_asus_s500sc_310105039w_f7xph5.jpg',
		title: 'PC',
		category:'pc'
	},
	{
		id: 3,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650645242/DTComputer/19475_ipad_pro_12_9_inch_wifi_sliver_zzgduu.jpg',
		title: 'Apple',
		category:'apple'
	},
	{
		id: 4,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650630639/DTComputer/y6t6nfruqq6ftnqalymx.jpg',
		title: 'Tai nghe',
		category:'tainghe'
	},
	{
		id: 5,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650628883/DTComputer/mqgly76q8o6bw0n9ndok.jpg',
		title: 'Ổ cứng',
		category:'ocung'
	},
	{
		id: 6,
		img: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650630099/DTComputer/fnoyeij3uz5egmm18oo2.jpg',
		title: 'Chuột',
		category:'chuot'
	},
];
const useStyles = makeStyles((theme) => ({
	root: { marginTop: '30px' },
	title: { padding: '10px 0' },
	img: {
		width: '150px',
		height: '150px',
		borderRadius: '100%',
	},
	wrap: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '100%',

		'&:hover': {
			color: 'orange',
			transition: '.5s',
		},
	},
}));
function TopTrending(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;
	return (
		<Box className={classes.root}>
			<Typography className={classes.title} variant="h4" component="h3">
				Top Trending Category
			</Typography>
			<Grid container>
				{data.map((item) => (
					<Grid item xs={12} sm={3} md={2}>
						<Link to="/products" onClick={()=>setCategory('category='+item.title)}>
							<Box className={classes.wrap}>
								<img className={classes.img} src={item.img} alt={item.title} />
								<Typography>{item.title}</Typography>
							</Box>
						</Link>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default TopTrending;
