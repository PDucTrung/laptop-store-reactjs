import { makeStyles } from '@material-ui/core';
import React from 'react';

NotFound.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundImage:
			'url(https://res.cloudinary.com/dzpks7wzs/image/upload/v1627117350/N16_ecommers/bg1_gdja62.jpg)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		
        backgroundSize:'cover',
        padding:'7.5rem'
	},
	h1: {
		fontSize: '10rem',
		fontWeight: '700',
		color: '#3F4254',
	},
    text:{
        color:'#B5B5C3'
    }
}));
function NotFound(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h1 className={classes.h1}>404</h1>
			<p className={classes.text}>OOPS! Something went wrong here</p>
		</div>
	);
}

export default NotFound;
