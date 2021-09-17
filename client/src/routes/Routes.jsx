import { BrowserRouter, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import RestrictAuth from './RestrictAuth';

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path="/">
					<Home />
				</PrivateRoute>
				<RestrictAuth exact path="/login">
					<Login />
				</RestrictAuth>
				<RestrictAuth exact path="/register">
					<h1>Register</h1>
				</RestrictAuth>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
