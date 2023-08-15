import axios from "axios";

const apiUri = import.meta.env.VITE_API_URI;

const instance = axios.create({
	baseURL: `${apiUri}/api`,
});

export const fetchProducts = () => instance.get("/products");
export const fetchVideoThumbnails = () => instance.get("/videoThumbnails");
export const fetchCommentsByVideoId = (videoId) =>
	instance.get(`/comments?videoID=${videoId}`);

export const submitComment = (videoId, username, comment) => {
	return instance.post(`/comments/submitComment/${videoId}`, {
		username,
		comment,
	});
};
