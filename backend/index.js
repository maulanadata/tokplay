require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./src/models/database");
const router = require("./src/routes");
const commentController = require("./src/controllers/commentController");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:5173",
	},
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Inisialisasi socket.io di commentController
commentController.initSocket(io);

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// Tangani event new-comment
	socket.on("new-comment", async (data) => {
		try {
			const newComment = await commentController.submitComment(data);
			io.emit("new-comment", newComment);
		} catch (error) {
			console.error("Failed to save comment:", error);
		}
	});

	// Tangani event disconnect
	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

app.use("/api", router);

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
