import { Button, Container, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReorderIcon from '@material-ui/icons/Reorder';
import React, { useState } from 'react';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Category from './category';
import CategoryMain from './categoryMain';
Submenu.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	button: {
		color: 'white',
		backgroundColor: '#2bbef9',
		borderRadius: '25px',
		padding: '10px 1.25rem',
		'&:hover': {
			backgroundColor: '#2bbef9',
		},
	},
	category: {
		position: 'relative',
	},
}));
function Submenu(props) {
	const classes = useStyles();
	const [toggle, setToggle] = useState(false);
	return (
		<Container className={classes.root}>
			<Grid container style={{justifyContent:'space-between',alignItems:'center'}}>
				<Grid item className={classes.category}>
					<Button
						className={clsx(classes.button, 'font-dosis')}
						variant="contained"
						startIcon={<ReorderIcon />}
						endIcon={<ExpandMoreIcon />}
						onClick={() => setToggle(!toggle)}
					>
						Danh mục
					</Button>
					<Category value={toggle} />
				</Grid>
				<Grid item>
					<CategoryMain />
				</Grid>
			</Grid>
		</Container>
	);
}

export default Submenu;
