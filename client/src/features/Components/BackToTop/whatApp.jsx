import { Typography } from '@material-ui/core';
import WhatsApp from '@material-ui/icons/WhatsApp';
import React from 'react';

WhatAppButton.propTypes = {};

function WhatAppButton(props) {
	return (
		<div>
			<Typography
				style={{
					position: 'fixed',
					bottom: '50px',
					left: '20px',
					backgroundColor: '#F5A526',
					padding: '10px',
					borderRadius: '20px',
					fontWeight: 'bold',
					display: 'flex',
					alignItems: 'center',
					color: 'white',
				}}
				component="a"
				href="https://api.whatsapp.com/send/?phone=84%20865298986&text&app_absent=0"
			>
				<WhatsApp />
				+84 865298986
			</Typography>
		</div>
	);
}

export default WhatAppButton;
