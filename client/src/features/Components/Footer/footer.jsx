import { Box, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../app/ContextGlobal';
const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: 'white',
		padding: theme.spacing(3),
	},
	col: {
		[theme.breakpoints.down('sm')]: {
			marginTop: '15px',
		},
	},
	list: {},
	items: {
		color: theme.palette.grey,
		padding: '5px 0',
		'&>a': {
			'&:hover': { color: theme.palette.grey[600] },
			[theme.breakpoints.down('sm')]: {
				fontSize: '14px',
			},
		},
	},
}));

const list = [
	{
		id: 1,
		title: 'HỖ TRỢ KHÁCH HÀNG',
		datalist: [
			' Các câu hỏi thường gặp',
			' Gửi yêu cầu hỗ trợ',
			' Hướng dẫn đặt hàng',
			' Phương thức vận chuyển',
			' Chính sách đổi trả',
			' Hướng dẫn trả góp',
			' Chính sách hàng nhập khẩu',
			' Hỗ trợ khách hàng: hotro@dtcomputer.vn',
		],
	},
	{
		id: 2,
		title: 'HỢP TÁC VÀ PHÁT TRIỂN',
		datalist: [' Quy chế', ' Chính sách'],
	},
	{
		id: 3,
		title: 'THANH TOÁN',
		datalist: [' Paypal', ' MOMO', ' Internet Banking'],
	},
	{
		id: 4,
		title: 'THÔNG TIN LIÊN HỆ',
		datalist: [' Địa chỉ:Việt Nam', ' Sđt:0123456', ' Email:dtconputer@gmail.com'],
	},
];
function Footer() {
	const classes = useStyles();
	const state = useContext(ContextGlobal);
	const [isAdmin] = state.userApi.isAdmin;

	if (isAdmin) return '';
	return (
		<Box className={classes.root}>
			<Container>
				<Grid container>
					{list.map((item) => (
						<Grid className={classes.col} item key={item.id} xs={12} sm={6} md={4} lg={3}>
							<Typography>{item.title}</Typography>
							<ul lassName={classes.list}>
								{item.datalist.map((list, index) => (
									<li key={index} className={classes.items}>
										<a href="#!">{list}</a>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}

export default Footer;
