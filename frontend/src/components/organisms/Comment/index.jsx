import React, { useState, useEffect } from "react";
import { convertTime } from "../../../utils/convertTime";
import { fetchCommentsByVideoId } from "../../../axios/api";

const Comment = ({ activeVideo, comments, className, ...props }) => {
	const [firstComment, setFirstComment] = useState();

	useEffect(() => {
		fetchCommentsByVideoId(activeVideo.videoID)
			.then((response) => {
				const filteredData = response.data.filter((respon) => {
					return respon.videoID === activeVideo.videoID;
				});
				setFirstComment(filteredData);
			})
			.catch((error) => {
				console.log("Error fetching comments:", error);
			});
	}, [comments]);

	// console.log("comment", comments);
	// console.log(activeVideo);

	// if (!firstComment) {
	// 	window.location.reload();
	// 	return;
	// }

	const customClass = `flex flex-col p-2 gap-4 ${className}`;
	return (
		<div className={customClass} {...props}>
			{comments ? (
				<>
					{comments.map((comment) => (
						<div key={comment.timestamp}>
							<div className="flex flex-col">
								<h3 className="text-gray-700 font-semibold">
									{comment.username}
								</h3>
								<p className="text-[10px] text-gray-500 mt-[-2px]">
									{convertTime(comment.timestamp)}
								</p>
							</div>
							<p className="text-gray-800">{comment.comment}</p>
						</div>
					))}
				</>
			) : (
				<>
					{firstComment.map((comment) => (
						<div key={comment.timestamp}>
							<div className="flex flex-col">
								<h3 className="text-gray-700 font-semibold">
									{comment.username}
								</h3>
								<p className="text-[10px] text-gray-500 mt-[-2px]">
									{convertTime(comment.timestamp)}
								</p>
							</div>
							<p className="text-gray-800">{comment.comment}</p>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Comment;
