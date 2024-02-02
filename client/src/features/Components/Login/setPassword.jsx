import { Button, FormGroup, FormLabel, IconButton, Input, TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ContextGlobal } from './../../../app/ContextGlobal/index';
import { useParams } from 'react-router-dom';
SetPassword.propTypes = {};

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		maxWidth: '500px',
		padding: '30px',
		margin: '0 auto',
	},
	formgroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '10px 0',
		alignItems: 'center',
		width: '100%',
	},
	label: {},
}));
function SetPassword(props) {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [token] = state.token;
	const [valuex, setValuex] = useState({
		setnewpass: '',
		comfirmnewpass: '',
	});
	console.log(valuex);
	const params = useParams();
	const [show, setShow] = useState(false);
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.put(`/user/setpassword`, { email: params.email, ...valuex });
			alert(res.data.msg);
            window.location.href = '/';
		} catch (error) {
			alert(error.response.data.msg);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValuex({ ...valuex, [name]: value });
	};
	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="setnewpass">
						Mật khẩu mới
					</FormLabel>
					<Input
						className={classes.input}
						name="setnewpass"
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
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="comfirmnewpass">
						Xác nhận mật khẩu mới
					</FormLabel>
					<Input
						className={classes.input}
						name="comfirmnewpass"
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

export default SetPassword;
