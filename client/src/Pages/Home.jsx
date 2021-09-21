import React from 'react';
import { useAuth } from '../Context/AuthProvider';
import { useNotes } from '../Context/NotesProvider';
import AuthApi from '../Api/AuthApi';
import { useHistory } from 'react-router-dom';
import { AddNote, AppBar, Avatar, Card, Grid, Input } from '../Components';
import useWindowWidth from '../hooks/useWindowWidth';

const authApi = new AuthApi();

// TODO: add addNote feature, make update and delete api calls

const Home = () => {
	const history = useHistory();
	const { user, resetAuth } = useAuth();
	const { notes, loading, error, removeNote, updateNote, addNewNote } =
		useNotes();
	const windowWidth = useWindowWidth();

	const handleLogout = async () => {
		try {
			logout({
				success: () => {
					resetAuth();
					history.push('/');
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

	const gridCol = () => {
		let col = 3;

		if (windowWidth <= 1400) {
			col = 2;
		}

		if (windowWidth <= 900) {
			col = 1;
		}

		return col;
	};

	const cardActions = {
		delete: async id => {
			removeNote(id);
		},
		update: async ({ id, title, body }) => {
			console.log({ id, title, body });
			updateNote(id, { title, body });
		},
	};

	return (
		<div>
			<AppBar>
				<div>
					<h2>Notes App</h2>
				</div>
				{windowWidth > 715 && (
					<div style={{ padding: '10px' }}>
						<Input
							type="search"
							placeholder="Search by Note Title"
							onChange={e => {
								console.log(e.target.value);
							}}
						/>
					</div>
				)}
				<div className="drop-down-container">
					<Avatar src={user.displayPicture} alt={user.name} size="sm" />
					<div className="drop-down">
						<ul>
							<li>
								<i className="fas fa-user"></i>
								My Profile
							</li>
							<li onClick={handleLogout}>
								<i className="fas fa-sign-out-alt"></i>
								Logout
							</li>
						</ul>
					</div>
				</div>
			</AppBar>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '10px',
				}}
			>
				<AddNote
					onAdd={(title, body) => {
						addNewNote({ title, body });
					}}
				/>
			</div>

			<section className="section">
				{error && <h1>Error while fetching notes</h1>}
				{!error && loading ? (
					<h1>Loading...</h1>
				) : notes.length === 0 ? (
					<div>
						<h2>No Notes</h2>
					</div>
				) : (
					<Grid col={gridCol()} gap="15">
						{notes.map(note => (
							<Card
								key={note.noteId}
								id={note.noteId}
								title={note.title}
								body={note.body}
								actions={cardActions}
							/>
						))}
					</Grid>
				)}
			</section>
		</div>
	);
};

export default Home;
