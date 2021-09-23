import React from 'react';
import spinner from '../image/Spinner.gif';

const Spinner = ({ size }) => {
	return (
		<div>
			<img src={spinner} alt="loading-spinner" className={`spinner-${size}`} />
		</div>
	);
};

export default Spinner;
