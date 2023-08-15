const Comment = require("../models/commentModel");
const socket = require("socket.io");

let io;

const initSocket = (httpServer) => {
	io = socket(httpServer);
};

// Get all comments
const getAllComments = async (req, res) => {
	try {
		const comments = await Comment.find({}).select("-_id -__v");
		res.status(200).json(comments);
	} catch (error) {
		res.status(404).json({ error: "Comments doesn't exist" });
	}
};

// Get comment by videoID
const getComment = async (req, res) => {
	try {
		const { videoID } = req.params;
		const comments = await Comment.find({ videoID }).select(
			"-_id -__v -videoID"
		);
		res.status(200).json(comments);
	} catch (error) {
		res.status(404).json({ error: "Comments doesn't exist" });
	}
};

// create comment
const submitComment = async (req, res) => {
	try {
		const { videoID } = req.params;
		const { username, comment } = req.body;
		const createdAt = Date.now();

		if (!username || !comment) {
			return res
				.status(400)
				.json({ error: "Username and comment are required!" });
		}

		const newComment = new Comment({
			videoID,
			username,
			comment,
			timestamp: createdAt,
		});

		await newComment.save();

		io.emit("commentAdded", newComment);

		res.status(201).json({ message: "Create comment has successfully" });
	} catch (error) {
		res.status(403).json({ error: "Failed add comments" });
	}
};

module.exports = { initSocket, getAllComments, getComment, submitComment };
