import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { datacategoryHome } from './../../../data/dataCategory-Home';
import { Container, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { ContextGlobal } from './../../../app/ContextGlobal/index';
import { Link } from 'react-router-dom';
import ConvertStr from './../../../utils/convertStr';
ItemCategory.propTypes = {};

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: '600',
        textTransform:'capitalize',
        fontSize:'14px',
       
	},
	img: {
		width: '70px',
		height: '57px',
        objectFit:'cover'
	},
	imgFrist: {
		width: '100%',
	},
	item: {
		border: '1px solid #e4e5ee',
		padding: '30px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		'&:nth-child(even)': {
			borderRight: '0',
		},
	},
	multiItem: {
		flexDirection: 'row',
	},
	text: {
		textAlign: 'center',
	},
}));
const datafirst = {
	id: 1,
	title: 'Laptop',
	quantity: 1,
	urlImg: 'https://res.cloudinary.com/drijkcrst/image/upload/v1650613761/DTComputer/z3mwhixg2auwampp2f0s.jpg',
};
function ItemCategory(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;

	return (
		<Container style={{ borderRadius: '10px',marginTop:'30px' }}>
			<Grid container>
				<Grid style={{ width: '20%' }} item>
					<Link
						className={classes.item}
						to="/products"
						onClick={() => setCategory('category=' + (datafirst.title))}
					>
						<img className={classes.imgFrist} src={datafirst.urlImg} alt="img" />
						<Typography className={clsx('font-inter', classes.title)}>{datafirst.title}</Typography>
						<Typography component="p" className={classes.quantity}>
							{datafirst.quantity}
						</Typography>
					</Link>
				</Grid>
				<Grid item style={{ width: '80%' }}>
					<Grid container>
						{datacategoryHome.map((item) => (
							<Grid key={item.id} item lg={3}>
								<Link
									className={clsx(classes.multiItem, classes.item)}
									to="/products"
									onClick={() => setCategory('category=' + (item.title))}
								>
									<img className={classes.img} src={item.urlImg} alt="img" />
									<Box className={classes.text}>
										<Typography component="p" className={clsx('font-inter', classes.title)}>
											{item.title}
										</Typography>
										<Typography component="p" className={classes.quantity}>
											{item.quantity}
										</Typography>
									</Box>
								</Link>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default ItemCategory;
