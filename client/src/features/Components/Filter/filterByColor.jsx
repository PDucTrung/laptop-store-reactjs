import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	makeStyles,
	Radio,
	RadioGroup,
	Typography
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ContextGlobal } from '../../../app/ContextGlobal';
const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	icon: {
		borderRadius: '50%',
		width: 16,
		height: 16,
		boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
		backgroundColor: '#f5f8fa',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
		'$root.Mui-focusVisible &': {
			outline: '2px auto rgba(19,124,189,.6)',
			outlineOffset: 2,
		},
		'input:hover ~ &': {
			backgroundColor: '#ebf1f5',
		},
		'input:disabled ~ &': {
			boxShadow: 'none',
			background: 'rgba(206,217,224,.5)',
		},
	},
	checkedIcon: {
		backgroundColor: '#137cbd',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
		'&:before': {
			display: 'block',
			width: 16,
			height: 16,
			backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
			content: '""',
		},
		'input:hover ~ &': {
			backgroundColor: '#106ba3',
		},
	},
});
function StyledRadio(props) {
	const classes = useStyles();

	return (
		<Radio
			className={classes.root}
			disableRipple
			color="default"
			checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
			icon={<span className={classes.icon} />}
			{...props}
		/>
	);
}
const colors = [
	{
		label: 'Đỏ',
		value: 'do',
	},
	{
		label: 'Vàng',
		value: 'vang',
	},
	{
		label: 'Đen',
		value: 'den',
	},
	{
		label: 'Xanh',
		value: 'xanh',
	},
	{
		label: 'Trắng',
		value: 'trang',
	},
	{
		label: 'Tím',
		value: 'tim',
	},
];

function FilterByColor(props) {
	const state = useContext(ContextGlobal);
	const [color, setColor] = state.productsAPI.color;

	return (
		<div>
			<Box>
				<FormControl component="fieldset">
					<FormLabel component="legend">
						<Typography variant="body1" component="h2">
							Màu sắc
						</Typography>
					</FormLabel>
					<RadioGroup name="color" value={color} onChange={(e) => setColor(e.target.value)}>
						<FormControlLabel value={''} control={<StyledRadio />} label="Tất cả" />
						{colors.map((color) => (
							<FormControlLabel
								value={'color=' + color.value}
								control={<StyledRadio />}
								label={color.label}
							/>
						))}
					</RadioGroup>
				</FormControl>
			</Box>
		</div>
	);
}

export default FilterByColor;
