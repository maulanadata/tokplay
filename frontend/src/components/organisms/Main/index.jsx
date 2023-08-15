import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";

const Main = ({ videos }) => {
	const { videoId } = useParams();
	const [activeVideo, setActiveVideo] = useState(null);

	useEffect(() => {
		const foundVideo = videos.find((video) => video.videoID === videoId);
		if (foundVideo) {
			document.title = foundVideo.title;
			setActiveVideo(foundVideo);
		} else {
			document.title = "Video not found";
		}
	}, [videos, videoId]);

	if (!activeVideo) {
		return (
			<>
				<div className="mt-4">Tidak ada video yang diputar</div>
			</>
		);
	}

	const getVideoIdFromLink = (linkProduct) => {
		const url = new URL(linkProduct);
		const searchParams = new URLSearchParams(url.search);
		return searchParams.get("v");
	};

	const opts = {
		height: "480",
		width: "720",
		playerVars: {
			autoplay: 1,
		},
	};

	return (
		<div className="flex flex-col gap-4 justify-center py-4">
			{activeVideo && (
				<>
					<YouTube
						videoId={getVideoIdFromLink(activeVideo.linkProduct)}
						opts={opts}
					/>
					<h1 className="text-2xl fw-8">{activeVideo.title}</h1>
				</>
			)}
		</div>
	);
};

export default Main;
