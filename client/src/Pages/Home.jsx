import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import AuthApi from '../Api/AuthApi';
import { useHistory } from 'react-router-dom';

const authApi = new AuthApi();

const Home = () => {
	const { user } = useAuth();
	const history = useHistory();
	const { setAccessToken, setUser } = useAuth();

	const handleLogout = async () => {
		try {
			logout({
				success: () => {
					history.push('/');
					setAccessToken('');
					setUser(null);
				},
				failure: () => console.log('Error while logging out'),
			});
		} catch (err) {
			console.error('logout', err);
		}
	};

	const logout = async ({ success, failure }) => {
		const { data, status } = await authApi.logout();
		console.log(data);
		console.log(status);
		if (status === 200) {
			success();
		} else {
			failure();
		}
	};

	return (
		<div>
			<h1>Home</h1>
			<pre>{JSON.stringify(user, null, 4)}</pre>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Home;
