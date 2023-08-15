import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from "react-router-dom";
import { fetchProducts, fetchVideoThumbnails } from "./axios/api";
import Layout from "./components/organisms/Layout";
import Main from "./components/organisms/Main";
import NotFound from "./components/organisms/Notfound";

function App() {
	const [activeVideo, setActiveVideo] = useState(null);
	const [sidebarVideos, setSidebarVideos] = useState([]);

	useEffect(() => {
		// Mengambil data dari API /api/products
		fetchProducts()
			.then((response) => {
				const products = response.data;
				setSidebarVideos(products);
				// console.log(products);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});

		// Mengambil data dari API /api/videoThumbnails
		fetchVideoThumbnails()
			.then((response) => {
				const videoThumbnails = response.data;
				setSidebarVideos((prevVideos) =>
					prevVideos.map((video) => ({
						...video,
						...videoThumbnails.find(
							(thumbnail) => thumbnail.videoID === video.videoID
						),
					}))
				);
			})
			.catch((error) => {
				console.error("Error fetching video thumbnails:", error);
			});
	}, []);

	const handleVideoClick = (video) => {
		setActiveVideo(video);
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Layout
							videos={sidebarVideos}
							activeVideo={activeVideo}
							onVideoClick={handleVideoClick}
						>
							<Outlet />
						</Layout>
					}
				>
					<Route
						path="video/:videoId"
						element={<Main videos={sidebarVideos} />}
					/>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
