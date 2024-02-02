import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { dataCategory } from '../../../../data/dataSubmenu';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ConvertStr from './../../../../utils/convertStr';
import { ContextGlobal } from './../../../../app/ContextGlobal/index';
Category.propTypes = {};

const useStyles = makeStyles(() => ({
	root: {
		border: '1px solid #e4e5ee',
		position: 'absolute',
		top: '54px',
		left: '0',
		zIndex: '15000',
		backgroundColor: '#fffff',
		width: '245px',
	},
	list: {
		display: 'flex',
		alignItems: 'center',
		margin: '7px 0',
		pointerEvents: 'auto',
		'&:hover': {
			color: '#2bbef9',
			transition: '.3s',
		},
		color: '#3e445a',
	},
	item: {
		padding: '4px 6px',
		'&:hover': {
			'&>div': {
				opacity: '1',
				visibility: 'visible',
			},
		},
	},
	show: {
		opacity: 1,
		visibility: 'visible',
		transition: '.3s',
	},
	hidden: {
		opacity: 0,
		visibility: 'hidden',
		maxHeight: '0',
		transition: '.3s',
	},
	submenu: {
		position: 'absolute',
		top: '0',
		left: '100%',
		width: '100%',
		height: '100%',
		opacity: '0',
		visibility: 'hidden',
		pointerEvents: 'auto',
		color: '#3e445a',
	},
	submenuItem: {
		margin: '8px 0',
		padding: '15px',
		'&:hover': {
			color: '#2bbef9',
			transition: '.3s',
		},
	},
	text:{
		textTransform:'capitalize'
	}
}));
function Category({ value = false }) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;

	return (
		<Paper className={clsx(value ? classes.show : classes.hidden, classes.root)}>
			<ul>
				{dataCategory.map((item) => (
					<li className={classes.item} key={item.id}>
						<Link className={classes.list} to="/products" onClick={() =>
													setCategory('category=' + (item.title))
												}>
							<Box className={classes.list} justifyContent="center" width="35px">
								{item.icon}
							</Box>

							<Typography className={classes.text}>{item.title}</Typography>
							{item?.endIcon ? item.endIcon : ''}
						</Link>
						{item?.datachild && (
							<Paper className={classes.submenu}>
								<ul>
									<li className={classes.submenuItem}>
										{item.datachild?.map((itemchild) => (
											<Link
												className={classes.list}
												to="/products"
												onClick={() =>
													setCategory('category=' + ConvertStr(itemchild).replace(/\s/g, ''))
												}
											>
												<Typography component="p" variant="subtitle1" className={classes.text}>
													{itemchild}
												</Typography>
											</Link>
										))}
									</li>
								</ul>
							</Paper>
						)}
					</li>
				))}
			</ul>
		</Paper>
	);
}

export default Category;
