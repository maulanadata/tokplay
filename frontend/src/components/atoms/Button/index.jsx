import React from "react";

const Button = ({ className, children, ...props }) => {
	const customClass = `ml-2 px-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`;

	return (
		<button className={customClass} {...props}>
			{children}
		</button>
	);
};

export default Button;
