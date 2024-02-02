import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

RegisterEmail.propTypes = {};

function RegisterEmail(props) {
	return (
		<Container >
			<Grid container style={{margin:'30px 0',justifyContent:'space-between'}}>
				<Grid item  xs={12} sm={12}  lg={6}>
					<Typography component="h3" variant="h4">
						ĐĂNG KÝ NHẬN THÔNG TIN
					</Typography>
					<Typography>Đăng ký ngay để là người đầu tiên cập nhật sớm nhất những tin tức.</Typography>
				</Grid>
				<Grid item  xs={12} sm={12} lg={6}>
					<form style={{display:'flex',justifyContent:'center' ,alignItems:'center'}}>
						<TextField style={{width:'300px',marginRight:'10px'}} variant="outlined" label="Nhập Email đăng Ký của bạn" />
						<Button variant="contained" color="primary" type="submit">Đăng ký</Button>
					</form>
				</Grid>
			</Grid>
		</Container>
	);
}

export default RegisterEmail;
