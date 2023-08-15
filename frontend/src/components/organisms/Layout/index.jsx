import React, { useEffect, useState } from "react";
import SidebarLeft from "../SidebarLeft";
import SidebarRight from "../SidebarRight";
import Header from "../Header";
import ListSearch from "../ListSearch";

const Layout = ({ videos, activeVideo, onVideoClick, children }) => {
	const [videoFromUrl, setVideoFromUrl] = useState(null);
	const [searcher, setSearcher] = useState("");
	const [showResult, setShowResult] = useState(true);

	useEffect(() => {
		const pathname = window.location.pathname;
		const videoIdFromUrl = pathname.split("/")[2];

		const video = videos.find((video) => video.videoID === videoIdFromUrl);
		setVideoFromUrl(video);

		if (videoFromUrl) {
			onVideoClick(videoFromUrl);
		}
	}, [videos, onVideoClick]);

	return (
		<div className="flex h-screen bg-gray-100">
			<SidebarLeft videos={videos} onVideoClick={onVideoClick} />
			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="flex border-b bg-white">
					<Header onSearch={setSearcher} />
				</header>
				<main className="flex overflow-y-auto">
					{searcher && showResult ? (
						<div className="px-4 sm:px-6 lg:px-8">
							<ListSearch
								videos={videos}
								searcher={searcher}
								onVideoClick={(video) => {
									onVideoClick(video);
									setShowResult(false);
								}}
							/>
						</div>
					) : (
						<div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
					)}
				</main>
			</div>
			<SidebarRight activeVideo={activeVideo} />
		</div>
	);
};

export default Layout;
