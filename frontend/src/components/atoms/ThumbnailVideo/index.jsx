import React from "react";

const ThumbnailVideo = ({ video, onClick, className, ...props }) => {
	const customClass = `border-2 border-white bg-white shadow-md rounded-md cursor-pointer ${className}`;

	return (
		<div className={customClass} onClick={() => onClick(video)} {...props}>
			<img
				src={video.urlImageThumbnail}
				alt={video.title}
				className="rounded-t-md"
			/>
			<div className="flex flex-col text-sm p-1 gap-1">
				<span className="font-semibold antialiased">{video.title}</span>
				<span>Rp. {video.price}</span>
			</div>
		</div>
	);
};

export default ThumbnailVideo;
