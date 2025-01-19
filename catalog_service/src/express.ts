import express from "express";
import productRouter from "./routes/product.router";
import { init as initBroker } from "./utils/broker";

const app = express();

app.use("/products", productRouter);

initBroker()
	.then(() => console.log("kakfka is initiated"))
	.catch((err) => console.log(err));

export default app;
