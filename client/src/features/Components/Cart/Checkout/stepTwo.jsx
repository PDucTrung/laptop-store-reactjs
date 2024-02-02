import { Paper, TextField, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';

StepTwo.propTypes = {};

function StepTwo({ handleChangeAddress,handleChangePhone, address = '', phone = '' }) {
	const state = useContext(ContextGlobal);

	return (
		<div>
			<Typography component="h2" variant="h5">
				Địa chỉ giao hàng
			</Typography>
			<Paper>
				<TextField value={address} onChange={(e) => handleChangeAddress(e.target.value)} label="Địa chỉ nhận hàng" />
				<TextField value={phone} onChange={(e) => handleChangePhone(e.target.value)} label="Số điện thoại" />
			</Paper>
		</div>
	);
}

export default StepTwo;
