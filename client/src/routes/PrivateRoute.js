import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';

const PrivateRoute = ({ children, ...rest }) => {
	const { accessToken, user, loading } = useAuth();
	const isAuth = !!accessToken && !!user;

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Route {...rest}>{isAuth ? children : <Redirect to="/login" />}</Route>
	);
};

export default PrivateRoute;
