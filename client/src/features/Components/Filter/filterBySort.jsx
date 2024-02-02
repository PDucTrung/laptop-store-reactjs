import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ContextGlobal } from '../../../app/ContextGlobal';
import FilterBySearch from './filterBySearch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
		},
	},
}));
export default function FilterBySort() {
	const state = useContext(ContextGlobal);
	const [sort, setSort] = state.productsAPI.sort;
	const classes = useStyles();
	return (
		<Paper className={classes.root} square style={{ display: 'flex', alignItems: 'center' }}>
			<Tabs value={sort} indicatorColor="primary" textColor="primary" onChange={(e, value) => setSort(value)}>
				<Tab label="Mới nhất" value="" />

				<Tab label="Giá Cao Nhất" value="sort=-price" />
				<Tab label="Giá Thấp Nhất" value="sort=price" />
				<Tab label="Bán Chạy Nhất" value="sort=-sold" />
				<Tab disabled />
			</Tabs>
			<FilterBySearch />
		</Paper>
	);
}
