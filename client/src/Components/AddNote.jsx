import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
	const [showTitle, setShowTitle] = useState(false);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [formError, setFormError] = useState({ title: false, body: false });

	const clearFields = () => {
		setTitle('');
		setBody('');
	};

	const validate = () => {
		if (!title) {
			setFormError(prev => ({ ...prev, title: true }));
			return false;
		}

		if (!body) {
			setFormError(prev => ({ ...prev, body: true }));
			return false;
		}

		return true;
	};

	const handleSubmit = () => {
		setFormError({ title: false, body: false });

		const isValid = validate();

		if (isValid) {
			clearFields();
			onAdd(title, body);
			setShowTitle(false);
		}
	};

	const handleCancel = () => {
		clearFields();
		setShowTitle(false);
	};

	const handleFocus = () => {
		setFormError({ title: '', body: '' });
		setShowTitle(true);
	};

	return (
		<div className="add-note">
			{showTitle && (
				<input
					type="text"
					placeholder="Title"
					className="input heading"
					value={title}
					style={formError.title ? { border: '1px solid red' } : {}}
					onChange={e => setTitle(e.target.value)}
				/>
			)}
			<textarea
				cols="30"
				rows="1"
				className="input paragraph"
				placeholder="Take a note"
				style={formError.body ? { border: '1px solid red' } : {}}
				onChange={e => setBody(e.target.value)}
				onFocus={handleFocus}
				value={body}
			></textarea>
			<button className="round-btn btn-primary right" onClick={handleSubmit}>
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
					onClick={handleCancel}
				>
					Cancel
				</button>
			)}
		</div>
	);
};

export default AddNote;
