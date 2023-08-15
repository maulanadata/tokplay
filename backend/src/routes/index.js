const express = require("express");
const router = express.Router();

const commentRoute = require("./commentRoute");
const productRoute = require("./productRoute");
const videoRoute = require("./videoThumbnailRoute");

router.use("/videoThumbnails", videoRoute);
router.use("/products", productRoute);
router.use("/comments", commentRoute);

module.exports = router;
