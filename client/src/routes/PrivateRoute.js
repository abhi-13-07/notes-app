import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import { NotesProvider } from '../Context/NotesProvider';

const PrivateRoute = ({ children, ...rest }) => {
	const { accessToken, user, loading } = useAuth();
	const isAuth = !!accessToken && !!user;

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Route {...rest}>
			{isAuth ? (
				<NotesProvider>{children}</NotesProvider>
			) : (
				<Redirect to="/login" />
			)}
		</Route>
	);
};

export default PrivateRoute;
