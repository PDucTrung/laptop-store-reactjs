import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
LoginWFB.propTypes = {};

function LoginWFB(props) {
	const responseFacebook = async (response) => {
		try {
			await axios.post('/user/loginGG', { email: response.email });
			localStorage.setItem('firstlogin', true);

			window.location.href = '/';
		} catch (err) {
			await axios.post('/user/registerGG', { name: response.name, email: response.email });
			localStorage.setItem('firstlogin', true);
			window.location.href = '/';
		}
	};
	const componentClicked = (response) => {
		// console.log(response);
	};
	return (
		<div style={{marginTop:'15px',fontSize:'14px'}}>
			<FacebookLogin
				appId="205840504771918"
				autoLoad={false}
				fields="name,email,picture"
				onClick={componentClicked}
				callback={responseFacebook}
                size="medium "
                textButton="Đăng nhập bằng facebook"
                
			/>
			
		</div>
	);
}

export default LoginWFB;
