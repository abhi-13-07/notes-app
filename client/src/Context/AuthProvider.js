import jwtDecode from 'jwt-decode';
import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthApi from '../Api/AuthApi';

const authApi = new AuthApi();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState('');
	const [expiresIn, setExpiresIn] = useState(0);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getAccessToken = async () => {
			const { data } = await authApi.refreshAccessToken();
			setAccessToken(data.accessToken);
			setUser(data.user);
			setLoading(false);
		};

		getAccessToken();

		return () => {
			authApi.cancelToken.cancel();
		};
	}, []);

	// set expires in
	useEffect(() => {
		if (!accessToken) return;

		const decodedToken = jwtDecode(accessToken);
		setExpiresIn(decodedToken.exp);
	}, [accessToken]);

	// refresh access token
	useEffect(() => {
		if (!expiresIn) return;

		const refreshInterval = expiresIn * 1000 - Date.now();

		const interval = setInterval(async () => {
			try {
				console.log('');
				const { data } = await authApi.refreshAccessToken();
				setAccessToken(data.accessToken);
			} catch (err) {
				console.log('error while refreshing access token', err);
			}
		}, refreshInterval - 60000);

		return () => {
			clearInterval(interval);
		};
	}, [expiresIn]);

	return (
		<AuthContext.Provider
			value={{ accessToken, user, setAccessToken, loading, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
