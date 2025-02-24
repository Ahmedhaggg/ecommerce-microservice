import http from "http";
import app from "./app";
import { init as initBroker } from "./utils/broker";
const PORT = process.env.APP_PORT || 8000;

const server = http.createServer(app);

initBroker()
	.then(() => console.log("broker initiated successfully"))
	.catch((err) => console.log(err));

server.listen(PORT, () => console.log("server is running in PORT = " + PORT));
