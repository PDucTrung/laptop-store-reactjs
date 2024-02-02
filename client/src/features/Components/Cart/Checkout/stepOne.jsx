import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography, Paper } from '@material-ui/core';

StepOne.propTypes = {};

function StepOne({ handleChange }) {
	return (
		<div>
			<Typography variant="h5" component="h2">
				Chọn hình thức giao hàng
			</Typography>
			<Paper>
				<FormControl component="fieldset">
					<RadioGroup aria-label="gender" name="giaohang" onChange={(e) => handleChange(e.target.value)}>
						<FormControlLabel value="tietkiem" control={<Radio />} label="Giao hàng tiết kiệm" />
						<FormControlLabel value="sieutoc" control={<Radio />} label="Giao hàng siêu tốc" />
					</RadioGroup>
				</FormControl>
			</Paper>
		</div>
	);
}

export default StepOne;
