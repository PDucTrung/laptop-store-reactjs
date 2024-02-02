import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import clsx from 'clsx';
BreadCrumb.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
		margin: '30px 0',
	},
	breadcrumbs: {
		marginTop: '20px',
	},
	linkItem: {
		'&:hover': {
			textDecoration: 'underline',
		},
		textTransform: 'uppercase',
		fontSize: '13px',
	},
}));

function BreadCrumb({ str = '', title = '', category = '' }) {
	const classes = useStyles();
	const [arr, setArr] = useState([]);

	useEffect(() => {
		setArr(str.split('/'));
	}, [str]);
	arr.splice(2, 1, title);
	return (
		<div>
			<div className={classes.root}>
				<Breadcrumbs className={classes.breadcrumbs} separator="›" aria-label="breadcrumb">
					<Link className={clsx(classes.linkItem, 'font-dosis')} color="inherit" to="/">
						Trang chủ
					</Link>
					{arr.map((item) => (
						<Link className={clsx(classes.linkItem, 'font-dosis')} color="inherit" to={`/${item}`}>
							{item}
						</Link>
					))}
					{category !== '' && (
						<Link className={clsx(classes.linkItem, 'font-dosis')} color="inherit" to="/">
							{category}
						</Link>
					)}
				</Breadcrumbs>
			</div>
		</div>
	);
}

export default BreadCrumb;
