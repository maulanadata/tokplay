import React from "react";

const TextArea = ({ className, ...props }) => {
	const customClass = `py-2 px-2 overflow-hidden resize-none border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${className}`;

	return <textarea className={customClass} rows={2} {...props} />;
};

export default TextArea;
