import React from 'react';

const Grid = ({ children, col, gap }) => {
	return <div className={`grid col-${col} gap-${gap}`}>{children}</div>;
};

export default Grid;
