const mongoose = require("mongoose");

const videoThumbnailSchema = new mongoose.Schema({
	videoID: {
		type: String,
		required: true,
		unique: true,
	},
	urlImageThumbnail: {
		type: String,
		required: true,
	},
});

const VideoThumbnail = mongoose.model("VideoThumbnail", videoThumbnailSchema);

module.exports = VideoThumbnail;
