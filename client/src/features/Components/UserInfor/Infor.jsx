import {
	Button, FormControlLabel, FormGroup, FormLabel, makeStyles, Radio,
	RadioGroup, TextField
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ContextGlobal } from './../../../app/ContextGlobal/index';
Infor.propTypes = {};
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
function Infor({ user = {} }) {
	// console.log(user);
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [token] = state.token;
	const [getValue, setgetValue] = useState({
		name: user.name ,
		address: user.address ,
		gender: user.genter ,
		phone: user.phone ,
		birthday: user.birthday ,
	});
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.patch(
				`/user/update/${user._id}`,
				{ ...getValue },
				{ headers: { authorization: token } }
			);
			alert(res.data.msg);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setgetValue({ ...getValue, [name]: value });
	};

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="name">
						Họ tên
					</FormLabel>
					<TextField
						className={classes.inputaaazz21}
						name="name"
						variant="outlined"
						value={getValue.name === '' ? user.name : getValue.name}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="email">
						Email
					</FormLabel>
					<TextField className={classes.input} name="email" variant="outlined" disabled value={user.email} />
				</FormGroup>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="address">
						Địa chỉ
					</FormLabel>
					<TextField
						className={classes.input}
						name="address"
						variant="outlined"
						value={getValue.address === '' ? user.address : getValue.address}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup className={classes.formgroup}>
					<FormLabel className={classes.label} for="email">
						Số điện thoại
					</FormLabel>
					<TextField
						className={classes.input}
						name="phone"
						variant="outlined"
						value={getValue.phone === '' ? user.phone : getValue.phone}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup style={{ width: '100%', display: 'flex' }} className={classes.formgroup}>
					<FormLabel className={classes.label} component="legend">
						Giới tính
					</FormLabel>
					<RadioGroup
						style={{ flexDirection: 'row', width: '225px' }}
						aria-label="gender"
						name="gender"
						onChange={handleChange}
						value={getValue.gender === '' ? user.gender : getValue.gender}
					>
						<FormControlLabel value="nam" control={<Radio />} label="Nam" />
						<FormControlLabel value="nu" control={<Radio />} label="Nữ" />
					</RadioGroup>
				</FormGroup>
				<TextField
					id="date"
					label="Ngày sinh"
					type="date"
					name="birthday"
					value={getValue.birthday === '' ? user.birthday : getValue.birthday}
					onChange={handleChange}
					className={classes.textField}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button type="submit" variant="outlined" color="primary">
					Cập nhật
				</Button>
			</form>
		</div>
	);
}

export default Infor;
