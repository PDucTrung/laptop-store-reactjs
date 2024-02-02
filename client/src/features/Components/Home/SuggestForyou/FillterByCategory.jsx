import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useContext, useEffect } from 'react';
import { ContextGlobal } from '../../../../app/ContextGlobal';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.down('sm')]: {
			flexWrap: 'wrap',
		},
	},
	tab: {
		overflow: 'auto',
		'&> div': {
			overflow: 'auto',
			'&>div': {
				overflow: 'auto',
			},
		},
	},
	' MuiTabs-fixed': {
		overflow: 'auto',
	},
}));
export default function FilterByCategory() {
	const state = useContext(ContextGlobal);
	const [sort, setSort] = state.productsAPI.category;
	const [categories] = state.categoryApi.category;
	const classes = useStyles();
	const match = useRouteMatch();
	useEffect(() => {
		if (match.url === '/') setSort('');
	}, [match.url]);
	return (
		<Box>
			<Paper className={classes.root} square style={{ display: 'flex', alignItems: 'center' }}>
				<Tabs
					className={classes.tab}
					value={sort}
					indicatorColor="primary"
					textColor="primary"
					onChange={(e, value) => setSort(value)}
					overflow="auto"
				>
					<Tab label="Mới nhất" value="" />

					{categories.map((item) => (
						<Tab label={item.name} value={'category=' + item.name} />
					))}
				</Tabs>
			</Paper>
		</Box>
	);
}
