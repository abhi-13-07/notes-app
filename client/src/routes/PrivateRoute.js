import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';
import { NotesProvider } from '../Context/NotesProvider';
import { Spinner } from '../Components';

const PrivateRoute = ({ children, ...rest }) => {
	const { accessToken, user, loading } = useAuth();
	const isAuth = !!accessToken && !!user;

	if (loading) {
		return (
			<div className="center">
				<Spinner size="70" />
			</div>
		);
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
