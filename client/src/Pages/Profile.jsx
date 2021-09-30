import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar } from '../Components';
import { useAuth } from '../Context/AuthProvider';
import { useNotes } from '../Context/NotesProvider';

const Profile = () => {
	const { user } = useAuth();
	const { notes } = useNotes();

	return (
		<div>
			<AppBar user={user} />
			<div className="text-center" style={{ marginTop: '15px' }}>
				<Avatar size="lg" src={user.displayPicture} />
				<div style={{ marginTop: '15px' }}>
					<Link
						to={'/change-photo'}
						style={{ marginTop: '15px', textDecoration: 'none' }}
					>
						Change Photo
					</Link>
				</div>
			</div>
			<section
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					className="bg-white"
					style={{
						minWidth: '400px',
						maxWidth: '400px',
						marginTop: '20px',
						padding: '10px',
					}}
				>
					<div style={{ marginBottom: '10px' }}>
						<span className="flex-center-between">
							<strong>Firstname: </strong>
							<span>{user?.firstName}</span>
						</span>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<span className="flex-center-between">
							<strong>Lastname: </strong>
							<span>{user?.lastName ?? '----'}</span>
						</span>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<span className="flex-center-between">
							<strong>Email: </strong>
							<span>{user?.email}</span>
						</span>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<span className="flex-center-between">
							<strong>Created At: </strong>
							<span>
								{new Date(user?.createdAt).toLocaleString('en-GB', {
									day: '2-digit',
									month: 'short',
									year: 'numeric',
									hour12: true,
									hour: '2-digit',
									minute: '2-digit',
								})}
							</span>
						</span>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<span className="flex-center-between">
							<strong>Total Notes: </strong>
							<span>{notes?.length}</span>
						</span>
					</div>
				</div>
			</section>

			<div className="text-center" style={{ marginTop: '15px' }}>
				<Link to="/" className="btn-primary-box">
					Back To Home
				</Link>
			</div>
		</div>
	);
};

export default Profile;
