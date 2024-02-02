import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import Login from '../Login/login';
import Register from '../Register/register';
import MenuMobile from './MenuMobile';
import SearchField from './searchField';
import Submenu from './submenu';

const useStyles = makeStyles((theme) => ({
	appbar: {
		backgroundColor: '#ffffff',
		color: '#3e445a',
		fontFamily: 'Dosis',
		borderBottom: '1px solid #eee',
		padding: '10px 0',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		cursor: 'pointer',
		color: '#223994',
		fontWeight: '700',

		[theme.breakpoints.down('sm')]: {
			textAlign: 'center',
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
		},
		marginLeft: '5px',
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: '#F3F4F7',
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	menuIcon: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	link: {
		color: '#3e445a',
		fontSize: '18px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0 7px',
		cursor: 'pointer',
		fontFamily: 'Dosis',
		fontWeight: '600',
		'&:hover': {
			color: '#2bbef9',
			transition: '.3s',
		},
	},
	iconheader: {
		display: 'flex',
		alignItems: 'center',
	},
}));
function Header(props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const [openRegister, setOpenRegister] = React.useState(false);

	const handleOpenRegister = () => {
		setOpenRegister(true);
	};

	const handleCloseRegister = () => {
		setOpenRegister(false);
	};
	const [openLogin, setOpenLogin] = React.useState(false);

	const handleOpenLogin = () => {
		setOpenLogin(true);
	};

	const handleCloseLogin = () => {
		setOpenLogin(false);
	};

	//useContext
	const state = useContext(ContextGlobal);
	const [isLogined] = state.userApi.isLogined;
	const [isAdmin] = state.userApi.isAdmin;
	const [cart] = state.userApi.cart;
	const [search, setSearch] = state.productsAPI.search;
	const handleLogout = async () => {
		await axios.get('/user/logout');
		localStorage.clear();
		window.location.href = '/';
	};

	//react-router/dom
	const history = useHistory();

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem
				onClick={() => {
					handleLogout();
					handleMenuClose();
				}}
			>
				<Link to="/about">Đăng xuất</Link>
			</MenuItem>
			<MenuItem
				onClick={() => {
					history.push('/user');
					handleMenuClose();
				}}
			>
				Tài khoản của tôi
			</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{isLogined ? (
				<>
					<MenuItem
						onClick={() => {
							handleLogout();
							handleMenuClose();
						}}
					>
						<Link to="/">Đăng xuất</Link>
					</MenuItem>
				</>
			) : (
				<>
					<Typography
						style={{ padding: '5px', float: 'right' }}
						className={classes.link}
						component="a"
						color="inherit"
						onClick={handleOpenLogin}
					>
						Đăng nhập
					</Typography>
					<Login open={openLogin} handleClose={handleCloseLogin} onClickQ={handleCloseLogin} />

					<Typography
						style={{ padding: '5px', float: 'right' }}
						className={classes.link}
						component="a"
						color="inherit"
						onClick={handleOpenRegister}
					>
						Đăng ký
					</Typography>
					<Register open={openRegister} handleClose={handleCloseRegister} />
				</>
			)}

			<MenuItem onClick={() => history.push('/cart')}>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={0} color="secondary">
						<ShoppingCartIcon />
					</Badge>
				</IconButton>
				<p>Giỏ hàng</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Cá nhân</p>
			</MenuItem>
		</Menu>
	);

	const [click, setClick] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	return (
		<Container>
			<Grid container>
				<Grid item className={classes.grow}>
					<AppBar elevation={0} className={classes.appbar} position="static" id="back-to-top-anchor">
						<Toolbar>
							<Box className={classes.menuIcon}>
								<MenuMobile />
							</Box>
							<Typography className={classes.title} variant="h6" noWrap onClick={() => history.push('/')}>
								{isAdmin ? (
									'Admin'
								) : (
									<Box className={classes.iconheader}>
										<img
											src="https://res.cloudinary.com/drijkcrst/image/upload/v1650618432/DTComputer/laptop-icon_ndttkh.png"
											alt="icon"
										/>
										<Typography className={classes.title}>DTComputer</Typography>
									</Box>
								)}
							</Typography>
							{isAdmin ? (
								' '
							) : (
								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<InputBase
										placeholder="Tìm kiếm sản phẩm..."
										classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
										}}
										inputProps={{ 'aria-label': 'search' }}
										onClick={() => setClick(!click)}
										onChange={(e) => setSearchTerm(e.target.value)}
										value={searchTerm}
									/>
									<SearchField
										show={click}
										searchTerm={searchTerm}
										handleClick={() => {
											setSearchTerm('');
											setClick(false);
										}}
									/>
								</div>
							)}
							<div className={classes.grow} />

							<div className={classes.sectionDesktop}>
								{isLogined ? (
									<></>
								) : (
									<>
										<Typography
											className={classes.link}
											component="a"
											color="inherit"
											onClick={handleOpenLogin}
										>
											Đăng nhập
										</Typography>
										<Login open={openLogin} handleClose={handleCloseLogin} />

										<Typography
											className={classes.link}
											component="a"
											color="inherit"
											onClick={handleOpenRegister}
										>
											Đăng ký
										</Typography>
										<Register open={openRegister} handleClose={handleCloseRegister} />
									</>
								)}

								{isAdmin ? (
									''
								) : (
									<>
										<IconButton
											aria-label="show 4 new mails"
											color="inherit"
											onClick={() => history.push('/cart')}
										>
											<Badge badgeContent={cart.length > 0 ? cart.length : '0'} color="secondary">
												<ShoppingCartIcon />
											</Badge>
										</IconButton>
									</>
								)}

								<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
							</div>

							<div className={classes.sectionMobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon />
								</IconButton>
							</div>
						</Toolbar>
						{isAdmin ? '' : <Submenu />}
					</AppBar>
					{renderMobileMenu}
					{isLogined ? renderMenu : ''}
				</Grid>
			</Grid>
		</Container>
	);
}

export default Header;
