import dotenv from "dotenv";

dotenv.config();

const DBURI: string = process.env.DBURI as string;

const PORT: string = process.env.PORT as string;

const JWT_SECRET: string = process.env.JWT_SECRET as string;

const KAFKA_BROKER_URI: string = process.env.KAFKA_BROKER_URI as string;

const KAFKA_CLIENT_ID: string = process.env.KAFKA_CLIENT_ID as string;

export { DBURI, PORT, JWT_SECRET, KAFKA_BROKER_URI, KAFKA_CLIENT_ID };
