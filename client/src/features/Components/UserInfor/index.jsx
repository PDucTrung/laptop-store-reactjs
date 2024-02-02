import { Container, Grid, Paper } from '@material-ui/core';
import React, { useContext } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { ContextGlobal } from '../../../app/ContextGlobal';
import Infor from './Infor';
import ListCategory from './listCategory';
import Manageorder from './manageorder';
import OrderedCheckout from './orderedCheckout';
import Password from './password';

User.propTypes = {};

function User(props) {
	const state = useContext(ContextGlobal);
	const [user] = state.userApi.user;
	const { url } = useRouteMatch();
	return (
		<Container style={{ marginTop: '50px', marginBottom: '50px' }}>
			<Grid container>
				<Grid item lg={3}>
					<ListCategory />
				</Grid>
				<Grid lg={9}>
					<Paper>
						<Switch>
							<Route path={`${url}`} exact>
								<Infor user={user} />
							</Route>
							<Route path={`${url}/orderd`} exact>
								<Manageorder />
							</Route>
							<Route path={`${url}/ordered`} exact>
								<OrderedCheckout />
							</Route>
							<Route path={`${url}/password`} exact>
								<Password user={user} />
							</Route>
						</Switch>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default User;
