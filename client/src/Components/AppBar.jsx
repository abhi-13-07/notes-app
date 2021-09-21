import React, { useState } from 'react';
import { Avatar } from '.';

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
						onFocus={() => setShowDropDown(true)}
						onBlur={() => setShowDropDown(false)}
					>
						<i className="fas fa-caret-down"></i>
					</button>
				</div>
				<div className={`drop-down-menu ${showDropDown && 'drop-down-active'}`}>
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
		</header>
	);
};

export default AppBar;
