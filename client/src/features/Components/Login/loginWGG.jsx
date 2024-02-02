import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginWGG(props) {
	const responseGoogle = async (response) => {
		try {
			await axios.post('/user/loginGG', { email: response.profileObj.email });
			localStorage.setItem('firstlogin', true);

			window.location.href = '/';
		} catch (err) {
			await axios.post('/user/registerGG', { name: response.profileObj.name, email: response.profileObj.email });
			localStorage.setItem('firstlogin', true);
			window.location.href = '/';
		}
	};
	const responseGoogleFalir = (response) => {
		console.log(response);
	};
	return (
		<div style={{ marginTop: '15px', textAlign: 'center' }}>
			<GoogleLogin
				clientId="4676813375-rgqm492akj1so8u2sh9gqk700ka6sh71.apps.googleusercontent.com"
				buttonText="Đăng nhập bằng google"
				onSuccess={responseGoogle}
				onFailure={responseGoogleFalir}
				cookiePolicy={'single_host_origin'}
				theme="dark"
				
			/>
		</div>
	);
}

export default LoginWGG;
