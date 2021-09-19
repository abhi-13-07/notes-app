import React from 'react';

const Input = ({ type, placeholder, name, onChange, className }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			name={name}
			onChange={onChange}
			className={`input ${className}`}
		/>
	);
};

export default Input;
