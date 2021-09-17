import React, { useState, useEffect, createContext, useContext } from 'react';
import AuthApi from '../Api/AuthApi';

const authApi = new AuthApi();

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState('');
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

	return (
		<AuthContext.Provider
			value={{ accessToken, user, setAccessToken, loading, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
