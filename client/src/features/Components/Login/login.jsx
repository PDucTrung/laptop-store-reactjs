import { Backdrop, Button, Fade, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import React, { useState } from 'react';
import LoginWFB from './loginWFB';
import LoginWGG from './loginWGG';
import { Link } from 'react-router-dom';
Login.propTypes = {};
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		display: 'flex',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(5),
	},

	email: {
		margin: theme.spacing(2, 0),
	},
	password: { margin: theme.spacing(2, 0) },
	img: {
		maxWidth: '300px',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
}));
function Login({ open, handleClose,onClickQ }) {
	const classes = useStyles();
	// const state = useContext(ContextGlobal);

	//console.log(isAdmin);
	const [form, setForm] = useState({
		email: '',
		password: '',
		show: false,
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/user/login', { ...form });
			localStorage.setItem('firstlogin', true);
			window.location.href = '/';
		} catch (err) {
			const failr = err.response.data.mgs;
			alert(failr);
		}
	};
	const toggleIcon = (e) => {
		setForm({
			...form,
			show: !form.show,
		});
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={open}
			onClose={handleClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>
				<Paper className={classes.paper}>
					<form className={classes.form} onSubmit={handleSubmit}>
						<Typography variant="h3" component="h2">
							Đăng nhập
						</Typography>
						<Input
							className={classes.email}
							name="email"
							value={form.email}
							placeholder="Email"
							onChange={handleChange}
							required
							type="email"
						/>
						<Input
							className={classes.password}
							name="password"
							value={form.password}
							placeholder="Password"
							type={form.show ? 'text' : 'password'}
							onChange={handleChange}
							required="true"
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={toggleIcon}>
										{form.show ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<Button type="submit" variant="contained" color="secondary">
							Đăng nhập
						</Button>
						<LoginWGG />
						<LoginWFB />
						<Link to="/quenmatkhau" style={{color:'blue',margin:'10px 0',textAlign:'right'}} onClick={onClickQ}>Quên mật khẩu</Link>
					</form>
					<img
						className={classes.img}
						src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png"
						alt="img"
					/>
					<CancelOutlinedIcon onClick={handleClose} />
				</Paper>
			</Fade>
		</Modal>
	);
}

export default Login;
