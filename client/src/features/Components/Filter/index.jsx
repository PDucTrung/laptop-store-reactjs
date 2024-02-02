import { Box } from '@material-ui/core';
import React from 'react';
import FilterByCategory from './filterByCategory';
import FilterByColor from './filterByColor';
import FilterByService from './filterByService';

function Filter(props) {
	return (
		<Box>
			<FilterByCategory />
			<FilterByService />
			<FilterByColor />
		</Box>
	);
}

export default Filter;
