import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import { dataCategoryLeft } from '../../../data/dataSubmenu';
import ConvertStr from '../../../utils/convertStr';
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		textTransform: 'capitalize',
	},
	list: {
		width: '80%',
	},
}));
function MenuMobile(props) {
	const classes = useStyles();
	const data = useContext(ContextGlobal);
	const [category, setCategory] = data.productsAPI.category;

	const [state, setState] = React.useState({
		left: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		setState({ ...state, [anchor]: open });
	};

	const list = (anchor) => (
		<div role="presentation" onClick={toggleDrawer(anchor, false)} >
			<List>
				<ListItem button>
					<Link to={`/`}>
						<Typography className={clsx('font-dosis', classes.title)} component="a" color="inherit">
							Trang chủ
						</Typography>
					</Link>
				</ListItem>
				{dataCategoryLeft.map((item) => (
					<ListItem button key={item.id}>
						<Link
							to={`/products`}
							onClick={() => setCategory('category=' + ConvertStr(item.title).replace(/\s/g, ''))}
						>
							<Typography className={clsx('font-dosis', classes.title)} component="a" color="inherit">
								{item.title}
							</Typography>
						</Link>
					</ListItem>
				))}
			</List>
			<Divider />
		</div>
	);

	return (
		<div style={{width:'80%'}}>
			<React.Fragment>
				<Button onClick={toggleDrawer('left', true)}>
					<MenuIcon />
				</Button>
				<SwipeableDrawer
					open={state['left']}
					onClose={toggleDrawer('left', false)}
					onOpen={toggleDrawer('left', true)}
				>
					{list('left')}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}

export default MenuMobile;
