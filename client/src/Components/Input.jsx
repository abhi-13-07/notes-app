import React from 'react';

const Input = ({ type, placeholder, name, onChange }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			name={name}
			onChange={onChange}
			className="input"
		/>
	);
};

export default Input;
