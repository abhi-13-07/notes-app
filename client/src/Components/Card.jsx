import React from 'react';

const Card = ({ title, body }) => {
	return (
		<div className="card">
			<h3 className="card-title">{title}</h3>
			<div className="card-body">
				<p>{body}</p>
			</div>
			<div className="action-container">
				<button className="action text-danger">
					<i className="fas fa-trash"></i>
					Delete
				</button>
				<button className="action text-primary">
					<i className="fas fa-pen"></i>
					Edit
				</button>
			</div>
		</div>
	);
};

export default Card;
