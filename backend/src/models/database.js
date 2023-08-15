require("dotenv").config();
const mongoose = require("mongoose");

const db_uri = process.env.DATABASE_URI;

mongoose.connect(db_uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("Connected to MongoDB");
});

db.on("error", (err) => {
	console.error("MongoDB connection error: ", err);
});
