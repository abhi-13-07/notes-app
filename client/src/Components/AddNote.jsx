import React, { useState } from 'react';

const AddNote = () => {
	const [showTitle, setShowTitle] = useState(false);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	return (
		<div className="add-note">
			{showTitle && (
				<input
					type="text"
					placeholder="Title"
					className="input"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			)}
			<textarea
				cols="30"
				rows="1"
				className="input"
				placeholder="Take a note"
				onChange={e => setBody(e.target.value)}
				onFocus={() => setShowTitle(true)}
			>
				{body}
			</textarea>
			<button className="round-btn btn-primary right">
				<i className="fas fa-plus"></i>
			</button>
			{showTitle && (
				<button
					style={{
						width: '100px',
						cursor: 'pointer',
						background: 'none',
						border: 'none',
						padding: '10px',
						color: 'cornflowerblue',
					}}
					onClick={() => setShowTitle(false)}
				>
					Cancel
				</button>
			)}
		</div>
	);
};

export default AddNote;
