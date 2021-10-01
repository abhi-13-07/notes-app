import React, { useState } from 'react';
import { Avatar } from '.';
import { Link } from 'react-router-dom';

const AppBar = ({ user, handleLogout }) => {
	const [showDropDown, setShowDropDown] = useState(false);

	return (
		<header className="app-bar">
			<div>
				<h2>Notes App</h2>
			</div>
			<div className="drop-down-container">
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<Avatar src={user.displayPicture} alt={user.name} size="sm" />
					<button
						className="caret-btn"
						onClick={() => setShowDropDown(prev => !prev)}
					>
						<i
							className={`fas ${
								showDropDown ? 'fa-caret-up' : 'fa-caret-down'
							}`}
						></i>
					</button>
				</div>
				<div className={`drop-down-menu ${showDropDown && 'drop-down-active'}`}>
					<ul>
						<li>
							<Link to="/me" style={{ textDecoration: 'none', color: 'black' }}>
								<i className="fas fa-user"></i>
								My Profile
							</Link>
						</li>
						<li onClick={handleLogout}>
							<i className="fas fa-sign-out-alt"></i>
							Logout
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default AppBar;
