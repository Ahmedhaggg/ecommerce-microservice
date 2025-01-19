import { Container } from "inversify";
import { TYPES } from "./types";
import { ProductController } from "../../controllers/product.controller";
import { ProductService } from "../../services/product.service";
import { ProductRepository } from "../../repositories/product.repository";
import { IProductService } from "../../interfaces/product.service.interface";
import {
	IKafkaConfig,
	IMessageBroker,
	IMessageConsumer,
	IMessageProducer,
	ITopicManager,
} from "../../utils/broker/interface";
import { KAFKA_BROKER_URI, KAFKA_CLIENT_ID } from "..";
import { Kafka, logLevel } from "kafkajs";
import { MessageProducer } from "../../utils/broker/producer";
import { MessageConsumer } from "../../utils/broker/consumer";
import { TopicManager } from "../../utils/broker/topicManager";
import { Broker } from "../../utils/broker/broker";

const container = new Container();

container.bind<IProductService>(TYPES.ProductService).to(ProductService);
container
	.bind<ProductRepository>(TYPES.ProductRepository)
	.to(ProductRepository);
container
	.bind<ProductController>(TYPES.ProductController)
	.to(ProductController);

container.bind<string>(TYPES.KAFKA_GROUP_ID).toConstantValue("catalog-service");

container.bind<IKafkaConfig>(TYPES.KafkaConfig).toConstantValue({
	clientId: KAFKA_CLIENT_ID,
	brokers: [KAFKA_BROKER_URI],
	logLevel: logLevel.ERROR,
});

// Kafka instance
container
	.bind<Kafka>(TYPES.Kafka)
	.toDynamicValue((context) => {
		const config = context.container.get<IKafkaConfig>(TYPES.KafkaConfig);
		return new Kafka({
			clientId: config.clientId,
			brokers: config.brokers,
			logLevel: config.logLevel,
		});
	})
	.inSingletonScope();

// kafka Services
container.bind<IMessageProducer>(TYPES.MessageProducer).to(MessageProducer);
container.bind<IMessageConsumer>(TYPES.MessageConsumer).to(MessageConsumer);
container.bind<ITopicManager>(TYPES.TopicManager).to(TopicManager);
container.bind<IMessageBroker>(TYPES.MessageBroker).to(Broker);

export { container, TYPES };
