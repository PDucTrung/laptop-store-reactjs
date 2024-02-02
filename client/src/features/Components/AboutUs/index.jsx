import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import IntroVideo from '../Home/Introduce/IntroVideo';
import Certificates from '../Home/Certificates';

AboutUs.propTypes = {};

function AboutUs(props) {
	return (
		<Container style={{backgroundColor:'white'}}>
			<Grid container>
				<Grid item lg={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
					<Typography variant="h3" component="h2">
						About Us
					</Typography>
					<Grid container style={{ justifyContent: 'center', alignItems: 'stretch', marginTop: '15px' }}>
						<Grid item lg={6} style={{ padding: '30px' }}>
							<Typography variant="subtitle1" component="p">
								King of hair We bring you hair products according to your requirements. Always ready to
								serve any request
							</Typography>
						</Grid>
						<Grid item lg={6}>
							<video controls width="100%">
								<source
									src="https://res.cloudinary.com/dzpks7wzs/video/upload/v1627980502/nustihair/520727835448579948-1_dye8hm.mp4"
									type="video/mp4"
								/>
							</video>
						</Grid>
					</Grid>
					<Box width='100%' textAlign='center'>
						<Certificates />
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default AboutUs;
