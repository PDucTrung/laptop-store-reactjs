import { CircularProgress } from '@material-ui/core';
import React from 'react';

Loading.propTypes = {};

function Loading(props) {
	return (
		<div>
			<CircularProgress color="secondary" />
		</div>
	);
}

export default Loading;
