import express from "express";
import productRouter from "./routes/product.router";
import { loggingMiddleware } from "./utils/logging";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { errorHandlerMiddleware } from "./utils/errorHandlers/errorHandleMiddleware";
import { broker } from "./utils/broker";

// app
const app = express();

// Apply the rate limiting middleware to all requests.
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-8",
	legacyHeaders: false,
});
app.use(limiter);

// helmet
app.use(helmet());

// parse request json
app.use(express.json({ limit: "10kb" }));

// using helmet middleware
app.use(loggingMiddleware);

// routes
app.use("/api/v1/products", productRouter);

// error handler middleware
app.use(errorHandlerMiddleware);

export default app;
