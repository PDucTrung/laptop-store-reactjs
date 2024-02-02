import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Paper, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
SearchField.propTypes = {};
const useStyles = makeStyles((theme) => ({
	search_field: {
		position: 'absolute',
		top: '35px',
		left: '0',
		zIndex: '1111',
		opacity: '0',
		padding: '15px',
	},
	show: {
		opacity: '1',
	},
	hide: {
		opacity: '0',
	},
	img: {
		width: '30px',
		height: '30px',
	},
	product: {
		display: 'flex',
		alignItems: 'center',
		margin: '10px 0',
	},
	title: {
		textTransform: 'capitalize',
		fontSize: '14px',
		maxWidth: '200px',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		marginLeft: '10px',
	},
}));
function SearchField({ show = false, searchTerm = '' ,handleClick}) {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	// const match = useRouteMatch();
	useEffect(() => {
		try {
			if (searchTerm !== '') {
				const getSearch = async () => {
					const res = await axios.get(`/api/products?title[regex]=${searchTerm}`);
					setProducts(res.data.products);
				};
				getSearch();
			}
		} catch (error) {
			console.log(error);
		}
	}, [searchTerm]);
	return (
		<Paper className={clsx(show ? classes.show : classes.hide, classes.search_field)} elevation={0}>
			<ul>
				{products?.map((item) => (
					<li className={classes.item} key={item._id}>
						<Link className={classes.product} to={`/products/${item._id}`} onClick={handleClick}  >
							<img className={classes.img} src={item.images.url} alt="img" />
							<Typography className={classes.title}>{item.title}</Typography>
						</Link>
					</li>
				))}
			</ul>
		</Paper>
	);
}

export default SearchField;
