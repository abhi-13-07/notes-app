import React from 'react';

const Avatar = ({ src, alt, size }) => {
	return (
		<div>
			<img src={src} alt={alt} className={`avatar-${size}`} />
		</div>
	);
};

export default Avatar;
