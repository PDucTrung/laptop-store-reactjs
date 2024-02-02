import { Box, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

CardCount.propTypes = {};

function CardCount({ backgroundcolor = '', icon, title = '', number = 0 }) {
	const useStyles = makeStyles({
		root: {
			minWidth: 275,
			padding: '10px',
			opacity: 0.9,
			background: backgroundcolor,
		},
		content: {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		bullet: {
			display: 'inline-block',
			margin: '0 2px',
			transform: 'scale(0.8)',
		},
		title: {
			color: 'white',
			fontSize: '20px',
		},
		pos: {
			marginBottom: 12,
			color: 'white',
			fontSize: '24px',
		},
		icon: {
			color: 'white',
			fontSize: '20px',
			'&>svg': {
				width: '3rem',
				height: '3rem',
			},
		},
	});
	const classes = useStyles();
	return (
		
			<Grid container>
				<Grid item lg={4}>
					<Card className={classes.root}>
						<CardContent className={classes.content}>
							<Box>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
									component="h2"
									variant="h4"
								>
									{title}
								</Typography>

								<Typography className={classes.pos} color="textSecondary" variant="h5">
									{number}
								</Typography>
							</Box>
							<Typography className={classes.icon}>{icon}</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		
	);
}

export default CardCount;
