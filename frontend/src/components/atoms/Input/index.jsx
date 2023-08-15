import React from "react";

const Input = ({ className, ...props }) => {
	const customClass = `py-1 px-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${className}`;

	return <input type="text" className={customClass} {...props} />;
};

export default Input;
