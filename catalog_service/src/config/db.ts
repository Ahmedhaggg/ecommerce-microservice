import { DBURI } from "./";
const mongoose = require("mongoose");
mongoose
	.connect(DBURI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((error: Error) => console.error("MongoDB connection error:", error));
