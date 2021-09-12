import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthApi from '../Api/AuthApi';

const authApi = new AuthApi();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		const getAccessToken = async () => {
			const response = await authApi.refreshAccessToken();
			console.log(response);
		};

		getAccessToken();

		return () => {
			authApi.cancelToken.cancel();
		};
	}, []);

	useEffect(() => {
		// TODO: decode jwt
	}, [accessToken]);

	return (
		<AuthContext.Provider value={{ accessToken, user, setAccessToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
