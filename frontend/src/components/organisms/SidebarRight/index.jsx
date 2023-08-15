import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Comment from "../Comment";
import CommentInput from "../CommentInput";
import { useLocation } from "react-router";
import { fetchCommentsByVideoId } from "../../../axios/api";

const SidebarRight = ({ activeVideo }) => {
	const BASE_API = import.meta.env.VITE_API_URI;

	const [socket, setSocket] = useState();
	const [comments, setComments] = useState();

	const location = useLocation();
	const pathname = location.pathname;
	const videoIdFromUrl = pathname.split("/")[2];

	useEffect(() => {
		if (videoIdFromUrl) {
			fetchCommentsByVideoId(videoIdFromUrl)
				.then((response) => {
					const filteredData = response.data.filter((respon) => {
						return respon.videoID === videoIdFromUrl;
					});
					setComments(filteredData);
				})
				.catch((error) => {
					console.log("Error fetching comments:", error);
				});
		}
	}, [comments]);

	useEffect(() => {
		const newSocket = io(BASE_API, {
			reconnection: true,
			reconnectionAttempts: 3,
			reconnectionDelay: 1000,
		});
		setSocket(newSocket);

		// Handle event reconnect berhasil
		newSocket.on("reconnect", (attemptNumber) => {
			console.log(`Reconnected after ${attemptNumber} attempts`);
		});

		// Handle event reconnect gagal
		newSocket.on("reconnect_failed", () => {
			console.log("Reconnect failed");
		});

		newSocket.on("connect", () => {
			console.log("connect");
		});

		newSocket.on("new-comment", (newComment) => {
			setComments((prevComments) => [...prevComments, newComment]);
		});

		return () => {
			newSocket.disconnect();
		};
	}, [videoIdFromUrl]);
	// console.log(socket);
	// console.log(comments);

	return (
		<>
			{activeVideo && videoIdFromUrl && (
				<aside className="flex flex-col w-[300px] bg-white border-l text-sm ">
					<h2 className="p-5 text-lg font-semibold">Komentar</h2>
					<div className="flex flex-col h-full p-2 space-y-6 overflow-y-auto mb-4">
						<Comment activeVideo={activeVideo} comments={comments} />
					</div>
					<CommentInput
						videoId={videoIdFromUrl}
						socket={socket}
						setComments={setComments}
					/>
				</aside>
			)}
		</>
	);
};

export default SidebarRight;
