const express = require("express");
const router = express.Router();

const commentController = require("../controllers/commentController");

router.get("/", commentController.getAllComments);
router.get("/:videoID", commentController.getComment);
router.post("/submitComment/:videoID", commentController.submitComment);

module.exports = router;
