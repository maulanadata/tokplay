import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ThumbnailVideo from "../../atoms/ThumbnailVideo";

const ListSearch = ({ videos, searcher, onVideoClick }) => {
	const [searchResults, setSearchResults] = useState([]);

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchQuery = queryParams.get("q");

	useEffect(() => {
		if (searchQuery) {
			const filteredData = videos.filter((item) =>
				item.title.toLowerCase().includes(searcher.toLowerCase())
			);

			setSearchResults(filteredData);
		} else {
			setSearchResults([]);
		}
	}, [searchQuery]);

	return (
		!!searchResults && (
			<div className="w-full">
				<h2 className=" my-4 text-xl font-semibold">Hasil pencarian :</h2>
				<div className="mt-4 flex flex-wrap gap-4 w-full">
					{searchResults.map((video) => (
						<Link
							key={video.videoID}
							to={`video/${video.videoID}`}
							className="w-[170px]"
						>
							<ThumbnailVideo
								key={video.videoID}
								video={video}
								onClick={() => onVideoClick(video)}
								className={"border-gray-400 h-full"}
							/>
						</Link>
					))}
				</div>
			</div>
		)
	);
};

export default ListSearch;
