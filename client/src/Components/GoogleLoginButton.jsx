import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ clientId, onSuccess, onFailure }) => {
	return (
		<GoogleLogin
			clientId={clientId}
			buttonText="Continue With Google"
			onSuccess={onSuccess}
			onFailure={onFailure}
		/>
	);
};

export default GoogleLoginButton;
