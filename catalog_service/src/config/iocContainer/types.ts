import { ProductController } from "../../controllers/product.controller";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductService } from "../../services/product.service";

export const TYPES = {
	ProductController: Symbol.for("ProductController"),
	ProductService: Symbol.for("ProductService"),
	ProductRepository: Symbol.for("ProductRepository"),
	KAFKA_GROUP_ID: Symbol.for("KAFKA_GROUP_ID"),
	Kafka: Symbol.for("Kafka"),
	KafkaConfig: Symbol.for("KafkaConfig"),
	MessageProducer: Symbol.for("MessageProducer"),
	MessageConsumer: Symbol.for("MessageConsumer"),
	TopicManager: Symbol.for("TopicManager"),
	MessageBroker: Symbol.for("MessageBroker"),
};
