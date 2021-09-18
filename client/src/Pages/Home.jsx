import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNotes } from '../Context/NotesProvider';
import AuthApi from '../Api/AuthApi';
import { useHistory } from 'react-router-dom';
import { AppBar, Avatar, Card, Grid, Input } from '../Components';

const authApi = new AuthApi();

const Home = () => {
	const { user } = useAuth();
	const history = useHistory();
	const { setAccessToken, setUser } = useAuth();
	const { notes, loading, error } = useNotes();

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
					<Input
						type="search"
						placeholder="Search by Note Title"
						onChange={e => {
							console.log(e.target.value);
						}}
					/>
				</div>
				<div style={{ cursor: 'pointer' }}>
					<Avatar src={user.displayPicture} alt={user.name} size="sm" />
				</div>
			</AppBar>
			<section className="section">
				{error && <h1>Error while fetching notes</h1>}
				{!error && loading ? (
					<h1>Loading...</h1>
				) : notes.length === 0 ? (
					<div>
						<h2>No Notes</h2>
					</div>
				) : (
					<Grid col="3" gap="15">
						{notes.map(note => (
							<Card key={note._id} title={note.title} body={note.body} />
						))}
					</Grid>
				)}
			</section>
		</div>
	);
};

export default Home;
