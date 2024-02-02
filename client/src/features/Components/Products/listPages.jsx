import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Products from './Products';

function ListPage(props) {
	const { url } = useRouteMatch();
	return (
		<div>
			<Switch>
				<Route path={`${url}`} component={Products} exact />
			
			</Switch>
		</div>
	);
}

export default ListPage;
