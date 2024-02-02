import { makeStyles, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import CategoryIcon from '@material-ui/icons/Category';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PeopleIcon from '@material-ui/icons/People';
import ShopIcon from '@material-ui/icons/Shop';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import axios from 'axios';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../Header';
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		width: '100%',
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		backgroundColor: '#0e0c28',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		backgroundColor: '#0e0c28',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(7) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		'&>button': {
			color: 'white',
		},
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#0e0c28',
	},
	links: {
		padding: '15px 0',
		marginLeft: '10px',
		color: '#7a80b4',
		'&:hover': {
			color: 'white',
			transition: 0.5,
		},
	},
	icons: {
		color: '#7a80b4',
	},
	'MuiGrid-grid-lg-3': {
		flexBasis: '0',
	},
}));

function Links(props) {
	const classes = useStyles();

	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const handleLogout = async () => {
		await axios.get('/user/logout');
		localStorage.clear();
		window.location.href = '/';
	};
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<div className={classes.root}>
			<CssBaseline />
			<HeaderAdmin handleDrawerOpen={handleDrawerOpen} handleLogout={handleLogout} open={open} />
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<Typography style={{color:'whitesmoke',marginLeft:'20px'}} variant="h6">Admin</Typography>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List className={classes.list}>
					{[
						{
							key: '',
							value: 'Darshboard',
							icons: <DashboardIcon />,
						},
						{
							key: 'products',
							value: 'Quản lý sản phẩm',
							icons: <ListIcon />,
						},
						{
							key: 'category',
							value: 'Quản lý loại sản phẩm',
							icons: <CategoryIcon />,
						},
						{
							key: 'slider',
							value: 'Quản lý slide',
							icons: <ViewCarouselIcon />,
						},
						{
							key: 'users',
							value: 'Quản lý người dùng',
							icons: <PeopleIcon />,
						},
						{
							key: 'orderdCheckout',
							value: 'Quản lý đơn hàng',
							icons: <ShopIcon />,
						},
					].map((item, index) => (
						<Link to={`/admin/${item.key}`}>
							<ListItem className={classes.links} button key={index}>
								<ListItemIcon className={classes.icons}>{item.icons}</ListItemIcon>
								<ListItemText primary={item.value} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
			</Drawer>
		</div>
	);
}

export default Links;
