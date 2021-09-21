import React, { useState } from 'react';

const Card = ({ id, title, body, actions }) => {
	const [isEditMode, setIsEditMode] = useState();
	const [cardTitle, setCardTitle] = useState(title);
	const [cardBody, setCardBody] = useState(body);

	return (
		<div className="card">
			{isEditMode ? (
				<input
					style={{ width: '100%', marginBottom: '10px' }}
					className="input heading"
					type="text"
					value={cardTitle}
					onChange={e => setCardTitle(e.target.value)}
				/>
			) : (
				<h3 className="card-title">{cardTitle}</h3>
			)}
			<div className="card-body">
				{isEditMode ? (
					<textarea
						style={{ width: '100%' }}
						className="input paragraph"
						onChange={e => setCardBody(e.target.value)}
						rows="3"
						cols="8"
						defaultValue={cardBody}
					></textarea>
				) : (
					<p>{`${cardBody.slice(0, 50)}...`}</p>
				)}
			</div>
			<div className="action-container">
				{isEditMode ? (
					<>
						<button
							className="action text-success"
							onClick={() => {
								setIsEditMode(false);
								actions.update({ id, title: cardTitle, body: cardBody });
							}}
						>
							<i className="fas fa-check"></i>
							Update
						</button>
						<button
							className="action text-danger"
							onClick={() => setIsEditMode(false)}
						>
							<i className="fas fa-times"></i>
							Cancel
						</button>
					</>
				) : (
					<>
						<button
							className="action text-danger"
							onClick={() => actions?.delete(id)}
						>
							<i className="fas fa-trash"></i>
							Delete
						</button>
						<button
							className="action text-primary"
							onClick={() => {
								setIsEditMode(true);
							}}
						>
							<i className="fas fa-pen"></i>
							Edit
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Card;
