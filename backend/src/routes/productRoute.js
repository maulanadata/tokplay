const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/:videoID", productController.getProduct);
router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);

module.exports = router;
