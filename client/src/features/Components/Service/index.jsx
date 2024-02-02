import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import React from 'react';
Services.propTypes = {};

const data = [
	{
		id: 1,
		icon: <LocalShippingOutlinedIcon />,
		title: 'Miễn phí giao hàng',
		span: 'Miễn phí ship với đơn hàng > 498K',
	},
	{
		id: 2,
		icon: <LocalMallOutlinedIcon />,
		title: 'Thanh toán COD',
		span: 'Thanh toán khi nhận hàng (COD)',
	},
	{
		id: 3,
		icon: <PaymentOutlinedIcon />,
		title: 'Thanh toán online',
		span: 'Paypal,VNPay...',
	},
	{
		id: 4,
		icon: <ContactSupportOutlinedIcon />,
		title: 'Hỗ trợ bảo hành',
		span: 'Đổi, sửa đồ',
	},
];
const useStyles = makeStyles((theme) => ({
	icon: {
        marginRight:'15px',
		'&>svg': {
			height: '45px',
			width: '45px',
            opacity:'.6'
		},
	},
	title: {
		fontSize: '16px',
	},
	span: {
		fontSize: '13px',
	},
}));
function Services(props) {
	const classes = useStyles();
	return (
		<Container style={{margin:'15px 0'}}>
			<Grid container>
				{data.map((item) => (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Grid container style={{ alignItems: 'center' }}>
							<Grid className={classes.icon} item>
								{item.icon}
							</Grid>
							<Grid item lg={6}>
								<Typography className={classes.title}>{item.title}</Typography>
								<Typography className={classes.span}>{item.span}</Typography>
							</Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}

export default Services;
