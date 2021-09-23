import { BrowserRouter, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
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
					<Register />
				</RestrictAuth>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
