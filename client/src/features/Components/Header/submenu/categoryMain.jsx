import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { dataCategoryLeft } from '../../../../data/dataSubmenu';
import { Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ConvertStr from './../../../../utils/convertStr';
import { ContextGlobal } from './../../../../app/ContextGlobal/index';
CategoryMain.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {},
	list: {
		display: 'flex',
		alignItems: 'center',
	},
	items: {
		padding: '10px',
		'&:hover': {
			backgroundColor: '#f0faff',
			borderRadius: '15px',
		},
	},
	item: {
		padding: '10px',
		fontSize: '15px',
		fontWeight: '600',
		textTransform: 'uppercase',
		lineHeight: '15px',
		color: '#3e445a',
		'&:hover': {
			color: '#2bbef9',
			transition: '.3s',
		},
	},
}));
function CategoryMain(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [category, setCategory] = state.productsAPI.category;
console.log(state)
	return (
		<Box className={classes.root}>
			<ul className={classes.list}>
				<li className={classes.items}>
					<Link className={classes.item} to="/">
						Trang chủ
					</Link>
				</li>
				{dataCategoryLeft.map((item) => (
					<li className={classes.items} key={item.id}>
						<Link
							className={classes.item}
							to="/products"
							onClick={() => setCategory('category=' +(item.title))}
						>
							{item.title}
						</Link>
					</li>
				))}
                <li className={classes.items}>
					<Link className={classes.item} to="/contact-us">
						Liên hệ
					</Link>
				</li>
			</ul>
		</Box>
	);
}

export default CategoryMain;
