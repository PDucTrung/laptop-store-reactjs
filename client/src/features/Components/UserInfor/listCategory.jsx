import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
ListCategory.propTypes = {};
const data = [
	{
		id: 1,
		icon: <AccountCircleIcon />,
		title: 'Thông tin tài khoản',
		path: '',
	},
	{
		id: 3,
		icon: <MenuBookIcon />,
		title: 'Quản lý đơn hàng',
		path: '/ordered',
	},
	{
		id: 4,
		icon: <VpnKeyIcon />,
		title: 'Mật khẩu',
		path: '/password',
	},
];
function ListCategory(props) {
	const history = useHistory();
	const { url } = useRouteMatch();
	return (
		<div>
			<List component="nav" aria-label="main mailbox folders">
				{data.map((item) => (
					<ListItem onClick={() => history.push(`${url}${item.path}`)} button>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.title} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

export default ListCategory;
