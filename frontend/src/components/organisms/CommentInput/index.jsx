import React, { useState } from "react";
import Input from "../../atoms/Input";
import TextArea from "../../atoms/TextArea";
import Button from "../../atoms/Button";
import { submitComment } from "../../../axios/api";

const CommentInput = ({ videoId, socket, setComments, className }) => {
	const [username, setUsername] = useState("");
	const [comment, setComment] = useState("");
	const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
	const [isCommentEmpty, setIsCommentEmpty] = useState(false);

	const handleCommentSubmit = async () => {
		if (username.trim() === "") {
			setIsUsernameEmpty(true);
		} else {
			setIsUsernameEmpty(false);
		}

		if (comment.trim() === "") {
			setIsCommentEmpty(true);
		} else {
			setIsCommentEmpty(false);
		}

		if (username && comment && socket) {
			try {
				await submitComment(videoId, username, comment);

				setUsername("");
				setComment("");

				if (setComments) {
					setComments((prevComments) => [
						...prevComments,
						{
							username,
							comment,
							timestamp: Date.now(),
						},
					]);
				}
			} catch (error) {
				console.error("Error adding comment:", error);
			}
		}
	};

	const customClass = `p-3 w-full gap-2 flex flex-col justify-center bg-slate-400 ${className}`;

	return (
		<div className={customClass}>
			{isUsernameEmpty && (
				<span className="text-xs mb-[-5px] text-red-700">
					* Username harus diisi.
				</span>
			)}
			<Input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				onBlur={() => setIsUsernameEmpty(username.trim() === "")}
				onFocus={() => setIsUsernameEmpty(username.trim() !== "")}
				className="w-[230px]"
				required
				aria-required="true"
			/>

			{isCommentEmpty && (
				<span className="text-xs mb-[-5px] text-red-700">
					* Comment harus diisi.
				</span>
			)}
			<div className="flex ">
				<TextArea
					type="text"
					placeholder="Tambahkan komentar..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					onBlur={() => setIsCommentEmpty(comment.trim() === "")}
					onFocus={() => setIsCommentEmpty(comment.trim() !== "")}
					className="w-[230px]"
					aria-required="true"
				/>
				<Button
					type="submit"
					onClick={handleCommentSubmit}
					className="h-[35px] w-[35px] flex justify-center items-center"
				>
					<svg
						fill="#fff"
						height="25px"
						width="20px"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox="0 0 495.003 495.003"
						xmlSpace="preserve"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g
							id="SVGRepo_tracerCarrier"
							strokeLinecap="round"
							strokeLinejoin="round"
						></g>
						<g id="SVGRepo_iconCarrier">
							{" "}
							<g id="XMLID_51_">
								{" "}
								<path
									id="XMLID_53_"
									d="M164.711,456.687c0,2.966,1.647,5.686,4.266,7.072c2.617,1.385,5.799,1.207,8.245-0.468l55.09-37.616 l-67.6-32.22V456.687z"
								></path>{" "}
								<path
									id="XMLID_52_"
									d="M492.431,32.443c-1.513-1.395-3.466-2.125-5.44-2.125c-1.19,0-2.377,0.264-3.5,0.816L7.905,264.422 c-4.861,2.389-7.937,7.353-7.904,12.783c0.033,5.423,3.161,10.353,8.057,12.689l125.342,59.724l250.62-205.99L164.455,364.414 l156.145,74.4c1.918,0.919,4.012,1.376,6.084,1.376c1.768,0,3.519-0.322,5.186-0.977c3.637-1.438,6.527-4.318,7.97-7.956 L494.436,41.257C495.66,38.188,494.862,34.679,492.431,32.443z"
								></path>{" "}
							</g>{" "}
						</g>
					</svg>
				</Button>
			</div>
		</div>
	);
};

export default CommentInput;
