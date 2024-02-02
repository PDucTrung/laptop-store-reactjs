import { Button, FormGroup, FormLabel, IconButton, Input, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ContextGlobal } from './../../../app/ContextGlobal/index';
Password.propTypes = {};
const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '400px',
		padding: '30px',
	},
	formgroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '10px 0',
		alignItems: 'center',
		width: '100%',
	},
	label: {},
	inputaaazz21: {},
}));
function Password({ user = {} }) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [token] = state.token;
	const [valuezz, setValuezz] = useState({
		
		password: '',
		newpassword: '',
		comfirmnewpassword: '',
	});
	const [show, setShow] = useState(false);
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.put(`/user/repassword`, {email: user.email, ...valuezz }, { headers: { authorization: token } });
			alert(res.data.msg);
			console.log(valuezz);
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValuezz({ ...valuezz, [name]: value });
	};
	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="password">
						Mật khẩu hiện tại
					</FormLabel>
					<TextField
						className={classes.inputaaazz21}
						name="password"
						variant="outlined"
						onChange={handleChange}
					/>
				</FormGroup>

				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="newpassword">
						Mật khẩu mới
					</FormLabel>
					<TextField
						className={classes.input}
						name="newpassword"
						variant="outlined"
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="comfirmnewpassword">
						Xác nhận mật khẩu mới
					</FormLabel>
					<Input
						className={classes.input}
						name="comfirmnewpassword"
						variant="outlined"
						onChange={handleChange}
						type={show ? 'text' : 'password'}
						endAdornment={
							<InputAdornment position="end">
								<IconButton aria-label="toggle password visibility" onClick={() => setShow(!show)}>
									{show ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormGroup>

				<Button type="submit" variant="outlined" color="primary">
					Cập nhật
				</Button>
			</form>
		</div>
	);
}

export default Password;
