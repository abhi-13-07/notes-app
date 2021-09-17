import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import AuthApi from '../Api/AuthApi';
import { useHistory } from 'react-router-dom';
import { AppBar, Avatar } from '../Components';

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
			<AppBar>
				<div>
					<h2>Notes App</h2>
				</div>
				<div>
					<input type="search" placeholder="Search by title" />
				</div>
				<div style={{ cursor: 'pointer' }}>
					<Avatar src={user.displayPicture} alt={user.name} size="sm" />
				</div>
			</AppBar>
		</div>
	);
};

export default Home;
