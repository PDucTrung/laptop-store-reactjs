import { Box, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	appBar: {
		backgroundColor: 'white',
		color: '#6c7293',
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},

	box: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center',
	},
	link: {
		cursor: 'pointer',
	},
}));
function HeaderAdmin({ handleDrawerOpen, handleLogout, open }) {
	const classes = useStyles();

	var elem = document.documentElement;
	const [openn, setOpenn] = React.useState(false);

	const handleFullscreen = () => {
		setOpenn(true);
	};

	const handleFullscreenExit = () => {
		setOpenn(false);
	};
	const goFullScreen = () => {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE11 */
			elem.msRequestFullscreen();
		}
	};
	const closeScreen = async () => {
		if (!document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			/* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE11 */
			document.msExitFullscreen();
		}
	};
	return (
		<div>
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Box className={classes.box}>
						<li>
							<FullscreenIcon
								className={clsx(classes.menuButton, {
									[classes.hide]: openn,
								})}
								onClick={() => {
									goFullScreen();
									handleFullscreen();
								}}
							/>
							<FullscreenExitIcon
								className={clsx(classes.menuButton, {
									[classes.hide]: !openn,
								})}
								onClick={() => {
									closeScreen();
									handleFullscreenExit();
								}}
							/>
						</li>
						<Typography className={classes.link} component="a" color="inherit" onClick={handleLogout}>
							Đăng xuất
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default HeaderAdmin;
