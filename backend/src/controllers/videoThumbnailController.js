const VideoThumbnail = require("../models/videoThumbnailModel");
const { generateVideoID } = require("../utils/customID");

// get all video thumbnails
const getVideoThumbnails = async (req, res) => {
	try {
		const videoThumbnails = await VideoThumbnail.find({}).select("-_id -__v");
		res.status(200).json(videoThumbnails);
	} catch (error) {
		res.status(404).json({ error: "VideoThumbnails doesn't exist" });
	}
};

// create video thumbnail
const createVideoThumbnail = async (req, res) => {
	try {
		const videoID = generateVideoID();
		const { urlImageThumbnail } = req.body;

		if (!urlImageThumbnail) {
			return res.status(400).json({ error: "UrlImageThumbnail are required!" });
		}

		const newVideoThumbnail = new VideoThumbnail({
			videoID,
			urlImageThumbnail,
		});

		await newVideoThumbnail.save();
		res.status(200).json(newVideoThumbnail);
	} catch (error) {
		res.status(403).json({ error: "Failed add videoThumbnails" });
	}
};

module.exports = { getVideoThumbnails, createVideoThumbnail };
