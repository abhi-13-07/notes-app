import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Context/AuthProvider';

const RestrictAuth = ({ children, ...rest }) => {
	const { loading, user, accessToken } = useAuth();
	const isAuth = !loading && !!user && !!accessToken;

	return <Route {...rest}>{isAuth ? <Redirect to="/" /> : children}</Route>;
};

export default RestrictAuth;
