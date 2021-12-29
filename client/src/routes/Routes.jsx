import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "../Context/AuthProvider";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import RestrictAuth from "./RestrictAuth";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<AuthProvider>
					<RestrictAuth exact path="/login">
						<Login />
					</RestrictAuth>

					<RestrictAuth exact path="/register">
						<Register />
					</RestrictAuth>

					<PrivateRoute exact path="/">
						<Home />
					</PrivateRoute>

					<PrivateRoute exact path="/me">
						<Profile />
					</PrivateRoute>
				</AuthProvider>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
