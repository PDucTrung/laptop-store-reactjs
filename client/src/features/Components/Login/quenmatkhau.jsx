import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

Quenmatkhau.propTypes = {};
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '400px',
		margin: '15px auto',
        display:'flex'
	},
    input:{
        width:'300px'
    }
}));
function Quenmatkhau(props) {
	const [receiEmail, setreceiEmail] = useState('');
	const classes = useStyles();
	const gui = () => {
		try {
			const gee = async () => {
				const res = await axios.post('/api/quenmatkhau', { receiEmail });
				alert(res.data.message);
				window.location.href = '/';
			};
			gee();
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<div className={classes.root}>
			<TextField
				label="Nhập email cần lấy lại mật khẩu"
				type="email"
				onChange={(e) => setreceiEmail(e.target.value)}
                className={classes.input}
			/>
			<Button variant="contained" color="primary" onClick={gui}>
				Gửi
			</Button>
		</div>
	);
}

export default Quenmatkhau;
