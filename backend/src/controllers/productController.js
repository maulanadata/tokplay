const Product = require("../models/productModel");
const { generateProductID } = require("../utils/customID");

// Get all products
const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}).select("-_id -__v");
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ error: "Products doesn't exist" });
	}
};

// Get product by videoID
const getProduct = async (req, res) => {
	try {
		const { videoID } = req.params;
		const products = await Product.find({ videoID }).select(
			"-_id -__v -videoID"
		);
		res.status(200).json(products);
	} catch (error) {
		res.status(404).json({ error: "Products doesn't exist" });
	}
};

// create product
const createProduct = async (req, res) => {
	try {
		const productID = generateProductID();
		const { videoID, linkProduct, title, price } = req.body;

		if (!videoID || !linkProduct || !title || !price) {
			return res.status(400).json({
				error: "VideoID, linkProduct, title, and price are required!",
			});
		}

		const newProduct = new Product({
			productID: productID,
			videoID: videoID,
			linkProduct: linkProduct,
			title: title,
			price: price,
		});

		await newProduct.save();
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(403).json({ error: "Failed add products" });
	}
};

module.exports = { getAllProducts, getProduct, createProduct };
