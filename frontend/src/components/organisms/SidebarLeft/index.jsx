import React from "react";
import { Link, useLocation } from "react-router-dom";
import ThumbnailVideo from "../../atoms/ThumbnailVideo";

const SidebarLeft = ({ videos, onVideoClick, className }) => {
	const location = useLocation();
	const pathname = location.pathname;
	const videoIdFromUrl = pathname.split("/")[2];

	const filteredVideos = videos.filter(
		(video) => video.videoID !== videoIdFromUrl
	);

	const customClass = `flex flex-col w-64 items-center bg-slate-400 border-r ${className}`;
	const customLogoClass =
		"text-2xl text-blue-800 font-semibold my-4 cursor-pointer tracking-wide border-b-2 border-b-blue-600 animate-bounce hover:uppercase hover:animate-none antialiased";

	return (
		<aside className={customClass}>
			<Link to="/" className={customLogoClass}>
				Tokplay
			</Link>
			<div className="flex flex-col p4 mt-[2px] pb-4 items-center overflow-y-auto snap-y mb-2">
				<div className="flex flex-col gap-3 w-[80%]">
					{filteredVideos.map((video) => (
						<Link key={video.videoID} to={`video/${video.videoID}`}>
							<ThumbnailVideo
								key={video.videoID}
								video={video}
								onClick={() => onVideoClick(video)}
								className={" scroll-mt-0 snap-start"}
							/>
						</Link>
					))}
				</div>
			</div>
		</aside>
	);
};

export default SidebarLeft;
